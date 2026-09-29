import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-fasal-dark via-fasal-dark to-fasal-green/20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-fasal-blue/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-fasal-green/20 rounded-full blur-3xl animate-float"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 glass rounded-full mb-6">
              <span className="text-fasal-blue text-sm font-medium">🌾 SIH 2026 | Agriculture</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">FasalForecast</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4">Block-la irundhu Panchayat varai — Weather, Refined.</p>
            <p className="text-gray-400 mb-8">AI-Powered Hyperlocal Weather Downscaling for Indian Farmers.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard" className="px-8 py-3 bg-fasal-green hover:bg-fasal-green/80 rounded-lg font-semibold transition-all glow">🚀 Launch Dashboard</Link>
              <Link to="/advisory" className="px-8 py-3 glass hover:bg-white/10 rounded-lg font-semibold transition-all border border-fasal-blue/30">📋 View Advisories</Link>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-fasal-blue">6 km</p>
                <p className="text-xs text-gray-400">Resolution</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-fasal-green">250+</p>
                <p className="text-xs text-gray-400">Panchayats</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-fasal-yellow">5-Day</p>
                <p className="text-xs text-gray-400">Forecast</p>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-fasal-green/30 to-fasal-blue/30 rounded-full blur-3xl"></div>
            <img src="/assets/logo.jpeg" alt="FasalForecast Logo" className="relative w-full max-w-md rounded-3xl shadow-2xl ring-1 ring-white/10 animate-float" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            { icon: '🛰️', title: 'Satellite Data', desc: 'IMD + SRTM DEM integration for terrain-aware forecasting' },
            { icon: '🧠', title: 'AI Downscaling', desc: 'Random Forest + XGBoost + CNN for high-resolution output' },
            { icon: '🌱', title: 'Agro-Advisory', desc: 'Irrigation, pest, sowing recommendations per panchayat' },
          ].map((f, i) => (
            <div key={i} className="glass rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-fasal-blue">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
