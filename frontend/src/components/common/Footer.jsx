const Footer = () => {
  return (
    <footer className="glass mt-auto border-t border-white/10">
      <div className="container-app py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo.jpeg"
              alt="FasalForecast"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-fasal-green/30"
            />
            <div>
              <h3 className="text-lg font-bold gradient-text">FasalForecast</h3>
              <p className="text-xs text-gray-400">SIH 2026 | Agriculture Theme</p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">
              © 2026 FasalForecast. AI-Powered Hyperlocal Weather Downscaling.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Block-la irundhu Panchayat varai — Weather, Refined.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
