import { useState } from 'react';

const phases = [
  { id: 1, label: 'Phase 1: Location Selection' },
  { id: 2, label: 'Phase 2: Data Overview' },
  { id: 3, label: 'Phase 3: Forecast Deep-Dive' },
  { id: 4, label: 'Phase 4: Farming Advisory' },
  { id: 5, label: 'Phase 5: Analytics' },
];

const PhaseTabs = () => {
  const [active, setActive] = useState(1);

  const scrollToPhase = (id) => {
    setActive(id);
    const el = document.getElementById(`phase-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="phase-tabs">
      {phases.map((p) => (
        <button
          key={p.id}
          onClick={() => scrollToPhase(p.id)}
          className={`phase-tab ${active === p.id ? 'active' : ''}`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
};

export default PhaseTabs;
