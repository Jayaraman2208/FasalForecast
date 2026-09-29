const Topbar = () => {
  return (
    <header className="topbar">
      {/* Search */}
      <div className="search-bar">
        <span style={{ color: '#64748b' }}>🔍</span>
        <input type="text" placeholder="Search panchayats, forecasts, advisories..." />
        <span className="search-kbd">⌘K</span>
      </div>

      {/* Right side */}
      <div className="topbar-right">
        <button className="topbar-btn">
          <span>☀️</span>
          <span>LIGHT</span>
        </button>
        <button className="topbar-btn live">
          <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%' }}></span>
          <span>LIVE</span>
        </button>
        <button className="topbar-btn">🔔</button>

        <div className="user-profile">
          <div className="user-avatar">J</div>
          <div className="user-info">
            <h4>Jay</h4>
            <p>Farm Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
