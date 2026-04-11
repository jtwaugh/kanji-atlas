export default function ReadingRow({ label, values, romaji, muted = false }) {
  const list = Array.isArray(values) ? values.filter(Boolean) : values ? [values] : [];
  if (list.length === 0) return null;
  return (
    <div className={`reading-row-group${muted ? ' reading-row--muted' : ''}`}>
      <div className="reading-row">
        <span className="reading-row__label" aria-hidden="true">{label}</span>
        <span className="reading-row__values">{list.join(' ・ ')}</span>
      </div>
      {romaji && <p className="reading-row__romaji">{romaji}</p>}
    </div>
  );
}
