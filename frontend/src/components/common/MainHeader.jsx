const MainHeader = () => {
  return (
    <header className="main-header">
      <div className="app-container flex items-center justify-between">
        <div className="header-brand">
          <img src="/assets/logo.jpeg" alt="FasalForecast" className="header-logo" />
          <div>
            <h1 className="header-title">FasalForecast</h1>
            <p className="header-subtitle">HYPERLOCAL WEATHER & FARMING ADVISORY</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <span className="badge-success">
            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
            Backend Connected
          </span>
          <a
            href="http://127.0.0.1:8000/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-blue text-xs"
          >
            Admin Panel
          </a>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
