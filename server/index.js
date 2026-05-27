import { createHash } from 'node:crypto';
import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const PORT = process.env.PORT || 8787;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;
const IP_SALT = process.env.IP_SALT;

if (!ALLOWED_ORIGIN) {
  console.error('ALLOWED_ORIGIN is required');
  process.exit(1);
}
if (!IP_SALT) {
  console.error('IP_SALT is required');
  process.exit(1);
}

const KINDS = new Set(['bug', 'term', 'character']);
const MAX_MESSAGE = 4000;

const buckets = new Map();
const BUCKET_CAPACITY = 5;
const REFILL_PER_MS = 1 / 60_000;

function allow(key) {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b) {
    buckets.set(key, { tokens: BUCKET_CAPACITY - 1, ts: now });
    return true;
  }
  const refilled = Math.min(
    BUCKET_CAPACITY,
    b.tokens + (now - b.ts) * REFILL_PER_MS,
  );
  if (refilled < 1) {
    b.tokens = refilled;
    b.ts = now;
    return false;
  }
  b.tokens = refilled - 1;
  b.ts = now;
  return true;
}

function sha256(s) {
  return createHash('sha256').update(s).digest('hex');
}

const app = express();
app.set('trust proxy', 1);
app.use(cors({ origin: ALLOWED_ORIGIN, methods: ['POST'] }));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/feedback', express.json({ limit: '8kb' }), async (req, res) => {
  const { kind, context_id, context_url, message, email, hp } = req.body || {};

  if (hp) return res.status(204).end();

  if (!KINDS.has(kind)) {
    return res.status(400).json({ error: 'bad kind' });
  }
  if (
    typeof message !== 'string' ||
    !message.trim() ||
    message.length > MAX_MESSAGE
  ) {
    return res.status(400).json({ error: 'bad message' });
  }

  const ipHash = sha256((req.ip || '') + IP_SALT);
  if (!allow(ipHash)) {
    return res.status(429).json({ error: 'slow down' });
  }

  try {
    await pool.query(
      `INSERT INTO feedback (kind, context_id, context_url, message, email, user_agent, ip_hash)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        kind,
        typeof context_id === 'string' && context_id ? context_id : null,
        typeof context_url === 'string' && context_url ? context_url : null,
        message.trim(),
        typeof email === 'string' && email.trim() ? email.trim() : null,
        req.get('user-agent') || null,
        ipHash,
      ],
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('insert failed', err);
    res.status(500).json({ error: 'server error' });
  }
});

app.listen(PORT, () => {
  console.log(`feedback api listening on :${PORT}`);
});
