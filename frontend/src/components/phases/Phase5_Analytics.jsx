const Phase5_Analytics = () => {
  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const accuracy = [82, 85, 88, 90, 87, 91, 89, 86, 92, 94];
  const pestRisk = [30, 45, 35, 50, 40, 55, 45, 60, 50, 40];

  return (
    <div id="section-pest" className="space-y-6">
      {/* Stats */}
      <div className="stats-grid">
        {[
          { icon: '📈', label: 'FORECAST ACCURACY', value: '94%', trend: '↑ 4.2% this month', type: 'up' },
          { icon: '🌾', label: 'ADVISORY SCORE', value: '70', trend: '↑ 5.2% from last week', type: 'up' },
          { icon: '⚠️', label: 'PEST RISK ZONES', value: '7', trend: '↑ 2 critical alerts', type: 'warn' },
          { icon: '💧', label: 'WATER SAVED', value: '1,247L', trend: '↑ 12.3% this month', type: 'up' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon">{s.icon}</div>
            <p className="stat-label">{s.label}</p>
            <p className="stat-value">{s.value}</p>
            <p className={`stat-trend ${s.type}`}>{s.trend}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="dashboard-grid">
        {/* Historical Forecast Accuracy */}
        <div className="card-dark">
          <div className="card-dark-header">
            <div>
              <h3 className="card-dark-title">📈 Historical Forecast Accuracy</h3>
              <p className="card-dark-subtitle">Monthly accuracy percentage</p>
            </div>
            <span className="badge-ai">📊 Analytics</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '180px', paddingTop: '1rem', gap: '0.5rem' }}>
            {accuracy.map((val, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flex: 1 }}>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '24px',
                    height: `${val}%`,
                    minHeight: '20px',
                    background: 'linear-gradient(180deg, #4FC3F7, #2E7D32)',
                    borderRadius: '4px 4px 0 0',
                  }}
                ></div>
                <span style={{ fontSize: '0.6rem', color: '#64748b' }}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pest Risk Trends */}
        <div className="card-dark">
          <div className="card-dark-header">
            <div>
              <h3 className="card-dark-title">📊 Pest Risk Trends</h3>
              <p className="card-dark-subtitle">Monthly risk assessment</p>
            </div>
            <span className="badge-ai">🧠 AI</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '180px', paddingTop: '1rem', gap: '0.5rem' }}>
            {pestRisk.map((val, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flex: 1 }}>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '24px',
                    height: `${val}%`,
                    minHeight: '20px',
                    background: 'linear-gradient(180deg, #FBC02D, #ef4444)',
                    borderRadius: '4px 4px 0 0',
                  }}
                ></div>
                <span style={{ fontSize: '0.6rem', color: '#64748b' }}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phase5_Analytics;
