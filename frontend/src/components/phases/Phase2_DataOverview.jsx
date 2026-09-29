const Phase2_DataOverview = () => {
  const stats = [
    { icon: '🌡️', label: 'TEMPERATURE', value: '28°C', trend: '↑ 2°C from yesterday', type: 'up' },
    { icon: '💧', label: 'RAINFALL', value: '8mm', trend: '↑ 5mm this week', type: 'up' },
    { icon: '💨', label: 'HUMIDITY', value: '75%', trend: '↑ 3% from last week', type: 'up' },
    { icon: '🧠', label: 'PEST RISK', value: 'Medium', trend: '⚠ 2 critical zones', type: 'warn' },
  ];

  const forecastDays = [
    { day: 'Mon', temp: 28, rain: 0 },
    { day: 'Tue', temp: 30, rain: 2 },
    { day: 'Wed', temp: 26, rain: 8 },
    { day: 'Thu', temp: 27, rain: 5 },
    { day: 'Fri', temp: 29, rain: 1 },
  ];

  return (
    <div id="section-panchayat" className="space-y-6">
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon">{s.icon}</div>
            <p className="stat-label">{s.label}</p>
            <p className="stat-value">{s.value}</p>
            <p className={`stat-trend ${s.type}`}>{s.trend}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Left: Forecast Chart */}
        <div className="card-dark">
          <div className="card-dark-header">
            <div>
              <h3 className="card-dark-title">5-Day Forecast</h3>
              <p className="card-dark-subtitle">Panchayat: Kariyampalayam • Block: Annur</p>
            </div>
            <span className="badge-live">
              <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%' }}></span>
              LIVE
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '1rem' }}>
            {forecastDays.map((d) => (
              <div key={d.day} style={{ flex: 1, textAlign: 'center', padding: '0.75rem 0.5rem', background: '#0f1420', borderRadius: '0.5rem' }}>
                <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>{d.day}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: '0.25rem 0' }}>{d.temp}°</p>
                <p style={{ fontSize: '0.7rem', color: '#4FC3F7' }}>💧 {d.rain}mm</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', paddingTop: '0.75rem', borderTop: '1px solid #1a2030' }}>
            <span>🌧️ Rain</span>
            <span>💨 Wind</span>
            <span>💧 Humidity</span>
            <span>🌡️ Temp</span>
            <span>☁️ Cloud</span>
          </div>
        </div>

        {/* Right: AI Insights */}
        <div className="card-dark">
          <div className="card-dark-header">
            <h3 className="card-dark-title">AI Insights</h3>
            <span className="badge-ai">🤖 AI</span>
          </div>

          <div className="insight-item">
            <div className="insight-header">
              <span className="insight-icon">💡</span>
              <span className="insight-title">Irrigation Optimization</span>
            </div>
            <p className="insight-text">Soil moisture optimal. Next irrigation in 2 days recommended.</p>
            <button className="insight-btn">Apply Schedule</button>
          </div>

          <div className="insight-item">
            <div className="insight-header">
              <span className="insight-icon">⚠️</span>
              <span className="insight-title">Pest Risk Alert</span>
            </div>
            <p className="insight-text">Medium pest risk detected. Monitor cotton crops closely.</p>
            <button className="insight-btn">View Details</button>
          </div>

          <div className="insight-item">
            <div className="insight-header">
              <span className="insight-icon">🌱</span>
              <span className="insight-title">Sowing Window</span>
            </div>
            <p className="insight-text">Optimal sowing window opens in 3 days for groundnut.</p>
            <button className="insight-btn">Set Reminder</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phase2_DataOverview;
