const Phase3_ForecastDeepDive = () => {
  const forecastDays = [
    { day: 'Mon', temp: 28, rain: 0, wind: 2, humidity: 72 },
    { day: 'Tue', temp: 30, rain: 2, wind: 3, humidity: 68 },
    { day: 'Wed', temp: 26, rain: 8, wind: 2, humidity: 85 },
    { day: 'Thu', temp: 27, rain: 5, wind: 4, humidity: 78 },
    { day: 'Fri', temp: 29, rain: 1, wind: 2, humidity: 70 },
  ];

  const irrigationSchedule = [
    { time: 'Morning', slot: '3:00 AM', duration: '2 hours', status: 'scheduled' },
    { time: 'Evening', slot: '8:00 PM', duration: '3 hours', status: 'scheduled' },
  ];

  const alerts = [
    { level: 'high', title: 'Heavy Rain Expected', desc: 'Next 48 hours la 50mm+ mazhai', icon: '🌧️' },
    { level: 'medium', title: 'Wind Speed Increase', desc: 'Wind speed 4 km/h varai pogum', icon: '💨' },
    { level: 'low', title: 'Humidity Rising', desc: 'Humidity 85% varai pogum', icon: '💧' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-dark">
        <div className="card-dark-header">
          <div>
            <h3 className="card-dark-title">🌤️ Forecast Deep-Dive</h3>
            <p className="card-dark-subtitle">📍 District: Coimbatore → 🏘️ Block: Annur → 🏡 Panchayat: Kariyampalayam</p>
          </div>
          <span className="badge-live">
            <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%' }}></span>
            LIVE
          </span>
        </div>

        {/* 5-Day Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
          {forecastDays.map(d => (
            <div key={d.day} style={{ padding: '0.85rem', background: '#0f1420', border: '1px solid #1a2030', borderRadius: '0.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: '0.4rem' }}>{d.day}</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem' }}>{d.temp}°</p>
              <p style={{ fontSize: '0.7rem', color: '#4FC3F7' }}>💧 {d.rain}mm</p>
              <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>💨 {d.wind} km/h</p>
              <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>💦 {d.humidity}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Irrigation + Alerts */}
      <div className="dashboard-grid">
        {/* Irrigation Schedule */}
        <div id="section-irrigation" className="card-dark">
          <div className="card-dark-header">
            <div>
              <h3 className="card-dark-title">💧 Irrigation Schedule</h3>
              <p className="card-dark-subtitle">Optimized watering times based on soil moisture & crop</p>
            </div>
            <span className="badge-ai">🤖 AI</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {irrigationSchedule.map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem', background: '#0f1420', border: '1px solid #1a2030', borderRadius: '0.5rem' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>{s.time} Irrigation</p>
                  <p style={{ fontSize: '0.7rem', color: '#64748b' }}>{s.slot} • {s.duration}</p>
                </div>
                <span style={{ padding: '0.25rem 0.6rem', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 700 }}>
                  {s.status.toUpperCase()}
                </span>
              </div>
            ))}

            <div style={{ padding: '0.85rem', background: 'rgba(79, 195, 247, 0.1)', border: '1px solid rgba(79, 195, 247, 0.3)', borderRadius: '0.5rem' }}>
              <p style={{ fontSize: '0.7rem', color: '#4FC3F7' }}>
                💡 Soil moisture optimal. Next irrigation 2 days la start pannunga.
              </p>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div id="section-alerts" className="card-dark">
          <div className="card-dark-header">
            <div>
              <h3 className="card-dark-title">⚠️ Active Alerts</h3>
              <p className="card-dark-subtitle">Weather warnings for your panchayat</p>
            </div>
            <span className="badge-ai" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
              3 ALERTS
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {alerts.map((a, i) => {
              const colors = {
                high: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#ef4444' },
                medium: { bg: 'rgba(251, 192, 45, 0.1)', border: 'rgba(251, 192, 45, 0.3)', text: '#FBC02D' },
                low: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', text: '#22c55e' },
              };
              const c = colors[a.level];
              return (
                <div key={i} style={{ padding: '0.75rem', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '1rem' }}>{a.icon}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: c.text }}>{a.title}</span>
                  </div>
                  <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phase3_ForecastDeepDive;
