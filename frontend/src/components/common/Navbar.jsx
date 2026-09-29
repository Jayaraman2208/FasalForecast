import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/advisory', label: 'Advisory' },
  ];

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="container-app flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <img
            src="/assets/logo.jpeg"
            alt="FasalForecast"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-fasal-green/50 group-hover:ring-fasal-blue transition-all duration-300"
          />
          <div className="leading-tight">
            <h1 className="text-lg font-bold gradient-text">FasalForecast</h1>
            <p className="text-[10px] text-gray-400 tracking-wide">HYPERLOCAL WEATHER AI</p>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1 md:gap-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === link.to
                  ? 'bg-fasal-green/20 text-fasal-blue'
                  : 'text-gray-300 hover:text-fasal-blue hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="http://127.0.0.1:8000/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 bg-fasal-green hover:bg-fasal-green-light rounded-lg text-sm font-semibold transition-all"
          >
            Admin
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
