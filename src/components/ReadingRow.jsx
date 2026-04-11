export default function ReadingRow({ label, values, muted = false }) {
  const list = Array.isArray(values) ? values.filter(Boolean) : values ? [values] : [];
  if (list.length === 0) return null;
  return (
    <div className={`reading-row${muted ? ' reading-row--muted' : ''}`}>
      <span className="reading-row__label" aria-hidden="true">{label}</span>
      <span className="reading-row__values">{list.join(' ・ ')}</span>
    </div>
  );
}
