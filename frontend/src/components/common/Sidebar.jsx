const navItems = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'forecast', icon: '🌤️', label: 'Forecast' },
  { id: 'advisory', icon: '📋', label: 'Advisory' },
  { id: 'panchayat', icon: '🏡', label: 'Panchayats' },
  { id: 'analytics', icon: '📈', label: 'Analytics' },
  { id: 'pest', icon: '🧠', label: 'Pest Prediction' },
  { id: 'irrigation', icon: '💧', label: 'Irrigation' },
  { id: 'alerts', icon: '⚠️', label: 'Alerts' },
  { id: 'admin', icon: '⚙️', label: 'Admin Panel' },
];

const Sidebar = ({ activeSection, setActiveSection }) => {
  const handleClick = (id) => {
    if (id === 'admin') {
      window.open('http://127.0.0.1:8000/admin', '_blank');
      return;
    }
    setActiveSection(id);
  };

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <img src="/assets/logo.jpeg" alt="FasalForecast" className="sidebar-logo" />
        <div className="sidebar-brand-text">
          <h1>FASAL</h1>
          <p>FORECAST</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
          >
            <span className="nav-item-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="system-status">
          <span className="status-dot"></span>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ffffff' }}>System Online</p>
            <p style={{ fontSize: '0.65rem', color: '#64748b' }}>All services operational</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
