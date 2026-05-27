CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE feedback (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind         text NOT NULL CHECK (kind IN ('bug','term','character')),
  context_id   text,
  context_url  text,
  message      text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 4000),
  email        text,
  user_agent   text,
  ip_hash      text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX feedback_created_at_idx ON feedback (created_at DESC);
CREATE INDEX feedback_kind_idx       ON feedback (kind);
