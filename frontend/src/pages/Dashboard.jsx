import { useState, useEffect } from 'react';
import { weatherApi } from '../api/weatherApi';

const Dashboard = () => {
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [panchayats, setPanchayats] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedPanchayat, setSelectedPanchayat] = useState('');
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking');

  // Check backend connection
  useEffect(() => {
    weatherApi.getDistricts()
      .then(data => {
        setDistricts(data.results || data || []);
        setBackendStatus('connected');
        setError('');
      })
      .catch(err => {
        setBackendStatus('disconnected');
        setError('Backend connect aagala. Django API endpoints create pannanum.');
        console.error('Backend error:', err);
      });
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      weatherApi.getBlocks(selectedDistrict)
        .then(data => setBlocks(data.results || data || []))
        .catch(err => console.error(err));
    } else {
      setBlocks([]);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedBlock) {
      weatherApi.getPanchayats(selectedBlock)
        .then(data => setPanchayats(data.results || data || []))
        .catch(err => console.error(err));
    } else {
      setPanchayats([]);
    }
  }, [selectedBlock]);

  useEffect(() => {
    if (selectedPanchayat) {
      setLoading(true);
      weatherApi.getPanchayatForecast(selectedPanchayat)
        .then(data => {
          setForecast(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Forecast data illa');
          setLoading(false);
        });
    }
  }, [selectedPanchayat]);

  return (
    <div className="section-pad">
      <div className="container-app">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">📊</span>
            <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
          </div>
          <p className="text-gray-400">Panchayat-level weather forecast select pannunga</p>
        </div>

        {/* Backend Status Banner */}
        {backendStatus === 'disconnected' && (
          <div className="glass rounded-xl p-5 mb-6 border-l-4 border-yellow-500">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <p className="text-yellow-400 font-semibold mb-1">Backend Connect Aagala</p>
                <p className="text-sm text-gray-400">
                  Django API endpoints create pannanum. Admin panel la sample data add pannunga.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Expected URL: http://127.0.0.1:8000/api/districts/
                </p>
              </div>
            </div>
          </div>
        )}

        {backendStatus === 'connected' && (
          <div className="glass rounded-xl p-4 mb-6 border-l-4 border-green-500">
            <div className="flex items-center gap-3">
              <span className="text-xl">✅</span>
              <p className="text-green-400 font-medium">Backend Connected!</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="glass rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-fasal-blue">🔍 Select Location</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-medium">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedBlock('');
                  setSelectedPanchayat('');
                }}
                className="select-styled"
              >
                <option value="">Select District</option>
                {districts.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2 font-medium">Block</label>
              <select
                value={selectedBlock}
                onChange={(e) => {
                  setSelectedBlock(e.target.value);
                  setSelectedPanchayat('');
                }}
                disabled={!selectedDistrict}
                className="select-styled"
              >
                <option value="">Select Block</option>
                {blocks.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2 font-medium">Panchayat</label>
              <select
                value={selectedPanchayat}
                onChange={(e) => setSelectedPanchayat(e.target.value)}
                disabled={!selectedBlock}
                className="select-styled"
              >
                <option value="">Select Panchayat</option>
                {panchayats.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Forecast Display */}
        {loading && (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="inline-block w-12 h-12 border-4 border-fasal-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="text-fasal-blue mt-4">Loading forecast...</p>
          </div>
        )}

        {forecast && !loading && (
          <div className="glass rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span>🌤️</span>
              <span className="gradient-text">5-Day Forecast</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {(forecast.forecasts || []).map((f, i) => (
                <div key={i} className="glass rounded-xl p-4 text-center card-hover">
                  <p className="text-sm text-gray-400 mb-2">{f.date}</p>
                  <p className="text-3xl font-bold text-fasal-blue">{f.temperature_max}°</p>
                  <p className="text-xs text-gray-400">Min: {f.temperature_min}°C</p>
                  <div className="mt-3 space-y-1">
                    <p className="text-sm">💧 {f.rainfall}mm</p>
                    <p className="text-xs text-gray-400">💨 {f.humidity}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!forecast && !loading && (
          <div className="glass rounded-2xl p-16 text-center">
            <p className="text-7xl mb-4">🌾</p>
            <p className="text-xl text-gray-300 mb-2">Select a Panchayat</p>
            <p className="text-gray-500">Panchayat select pannina, forecast data inga varum</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
