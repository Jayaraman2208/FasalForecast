const AdvisoryPage = () => {
  const advisories = [
    { category: 'Irrigation', icon: '💧', severity: 'high', text: 'Inniku irrigation vendaam — mazhai varum. Water save pannunga.', crop: 'Paddy' },
    { category: 'Pest Alert', icon: '🐛', severity: 'medium', text: 'Humidity adhikam — pest attack chance irukku. Monitor pannunga.', crop: 'Cotton' },
    { category: 'Sowing', icon: '🌱', severity: 'low', text: 'Sowing-ku best time — temperature 25°C, soil moisture optimal.', crop: 'Groundnut' },
    { category: 'Harvest', icon: '🌾', severity: 'medium', text: 'Harvest-ku ready — next 3 days dry weather irukkum.', crop: 'Maize' },
    { category: 'Fertilizer', icon: '🧪', severity: 'low', text: 'Urea apply pannunga — light rain expected tomorrow.', crop: 'Sugarcane' },
    { category: 'Weather Alert', icon: '⛈️', severity: 'high', text: 'Heavy rain warning — next 48 hours la 50mm+ mazhai.', crop: 'All' },
  ];

  const severityColors = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    low: 'bg-green-500/20 text-green-400 border-green-500/30',
  };

  return (
    <div className="section-pad">
      <div className="container-app">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">📋</span>
            <h1 className="text-4xl font-bold gradient-text">Agro-Advisories</h1>
          </div>
          <p className="text-gray-400">Panchayat-level farmer recommendations based on weather forecast</p>
        </div>

        {/* Filter Summary */}
        <div className="glass rounded-xl p-4 mb-8 flex flex-wrap items-center gap-4">
          <span className="text-sm text-gray-400">Filter by severity:</span>
          <div className="flex gap-2">
            {['All', 'High', 'Medium', 'Low'].map(s => (
              <button
                key={s}
                className="px-3 py-1 rounded-lg text-xs font-medium glass hover:bg-white/10 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Advisories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advisories.map((a, i) => (
            <div
              key={i}
              className={`glass rounded-2xl p-6 card-hover border-l-4 ${
                a.severity === 'high' ? 'border-red-500' :
                a.severity === 'medium' ? 'border-yellow-500' :
                'border-green-500'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{a.icon}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${severityColors[a.severity]}`}>
                  {a.severity.toUpperCase()}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">{a.category}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{a.text}</p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-gray-500">Crop: {a.crop}</span>
                <span className="text-xs text-fasal-blue">→ Details</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvisoryPage;
