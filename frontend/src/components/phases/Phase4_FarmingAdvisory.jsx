const Phase4_FarmingAdvisory = () => {
  const advisories = [
    { id: 1, level: 'High', category: 'Pest Control', text: 'அம்மைநோய் பாதிப்பு அதிகம். Approved pesticide use pannunga.', crop: 'Cotton', impact: '70%' },
    { id: 2, level: 'High', category: 'Irrigation', text: 'Irrigation in sowing season. Proper water management.', crop: 'Paddy', impact: '70%' },
    { id: 3, level: 'Low', category: 'Harvest', text: 'Harvest window optimal. Dry weather expected.', crop: 'Maize', impact: '70%' },
  ];

  const levelColor = {
    High: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
    Medium: { bg: 'rgba(251, 192, 45, 0.15)', color: '#FBC02D', border: 'rgba(251, 192, 45, 0.3)' },
    Low: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', border: 'rgba(34, 197, 94, 0.3)' },
  };

  return (
    <div id="section-advisory" className="dashboard-grid">
      {/* Left: Prioritized Advisories */}
      <div className="card-dark">
        <div className="card-dark-header">
          <div>
            <h3 className="card-dark-title">📋 Farming Advisories</h3>
            <p className="card-dark-subtitle">Prioritized recommendations for your panchayat</p>
          </div>
          <span className="badge-ai">🤖 AI Generated</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {advisories.map(a => (
            <div key={a.id} style={{ padding: '0.85rem', background: '#0f1420', border: '1px solid #1a2030', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: '0.35rem',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  background: levelColor[a.level].bg,
                  color: levelColor[a.level].color,
                  border: `1px solid ${levelColor[a.level].border}`,
                }}>
                  {a.level.toUpperCase()}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{a.category}</span>
                <span style={{ fontSize: '0.65rem', color: '#64748b', marginLeft: 'auto' }}>Crop: {a.crop}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.6rem' }}>{a.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Expected Impact: {a.impact}</span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button style={{ padding: '0.3rem 0.7rem', background: '#22c55e', color: 'white', border: 'none', borderRadius: '0.35rem', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer' }}>
                    Mark as Done
                  </button>
                  <button style={{ padding: '0.3rem 0.7rem', background: 'rgba(79, 195, 247, 0.15)', color: '#4FC3F7', border: '1px solid rgba(79, 195, 247, 0.3)', borderRadius: '0.35rem', fontSize: '0.65rem', fontWeight: 700, cursor: 'pointer' }}>
                    More Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Map + Performance */}
      <div className="card-dark">
        <div className="card-dark-header">
          <h3 className="card-dark-title">🗺️ Local Area Map</h3>
          <span className="badge-live">
            <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%' }}></span>
            LIVE
          </span>
        </div>

        <div style={{ height: '200px', background: '#0f1420', border: '1px solid #1a2030', borderRadius: '0.5rem', position: 'relative', overflow: 'hidden', marginBottom: '1rem' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(46, 125, 50, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(79, 195, 247, 0.3) 0%, transparent 50%)' }}></div>
          <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: 'rgba(21, 27, 46, 0.9)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.65rem', color: '#4FC3F7' }}>
            📍 Kariyampalayam
          </div>
        </div>

        <div style={{ padding: '0.85rem', background: '#0f1420', border: '1px solid #1a2030', borderRadius: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Performance Score</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#22c55e' }}>70</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: '#1a2030', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, #22c55e, #4FC3F7)', borderRadius: '999px' }}></div>
          </div>
          <p style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.4rem' }}>Advisory adherence score for your farm</p>
        </div>
      </div>
    </div>
  );
};

export default Phase4_FarmingAdvisory;
