import { useState, useEffect } from 'react';
import { weatherApi } from '../../api/weatherApi';

const Phase1_LocationSelect = () => {
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [panchayats, setPanchayats] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedPanchayat, setSelectedPanchayat] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    weatherApi.getDistricts()
      .then(data => setDistricts(data.results || data || []))
      .catch(err => {
        console.error(err);
        setError('Backend connect aagala');
      });
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      setLoading(true);
      weatherApi.getBlocks(selectedDistrict)
        .then(data => { setBlocks(data.results || data || []); setLoading(false); })
        .catch(err => { console.error(err); setLoading(false); });
    } else {
      setBlocks([]);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedBlock) {
      setLoading(true);
      weatherApi.getPanchayats(selectedBlock)
        .then(data => { setPanchayats(data.results || data || []); setLoading(false); })
        .catch(err => { console.error(err); setLoading(false); });
    } else {
      setPanchayats([]);
    }
  }, [selectedBlock]);

  const handleViewForecast = () => {
    if (!selectedPanchayat) {
      alert('Please select a Panchayat first!');
      return;
    }
    const el = document.getElementById('section-panchayat');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="section-forecast" className="card-dark">
      {/* Header */}
      <div className="card-dark-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '0.5rem',
            background: 'rgba(46, 125, 50, 0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem'
          }}>📍</div>
          <div>
            <h3 className="card-dark-title">Location Selection</h3>
            <p className="card-dark-subtitle">Choose district, block, and panchayat to view forecast</p>
          </div>
        </div>
        <span className="badge-live">
          <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%' }}></span>
          CONNECTED
        </span>
      </div>

      {error && (
        <div style={{
          padding: '0.75rem', marginBottom: '1rem',
          background: 'rgba(251, 192, 45, 0.1)',
          border: '1px solid rgba(251, 192, 45, 0.3)',
          borderRadius: '0.5rem',
          fontSize: '0.75rem', color: '#FBC02D'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: '0.4rem', display: 'block' }}>
            📍 DISTRICT
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedBlock('');
              setSelectedPanchayat('');
            }}
            style={{
              background: '#0f1420', color: '#e2e8f0',
              border: '1px solid #1a2030', padding: '0.65rem 0.85rem',
              borderRadius: '0.5rem', width: '100%', fontSize: '0.85rem',
              outline: 'none', cursor: 'pointer'
            }}
          >
            <option value="">Select District...</option>
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: '0.4rem', display: 'block' }}>
            🏘️ BLOCK
          </label>
          <select
            value={selectedBlock}
            onChange={(e) => {
              setSelectedBlock(e.target.value);
              setSelectedPanchayat('');
            }}
            disabled={!selectedDistrict}
            style={{
              background: '#0f1420', color: '#e2e8f0',
              border: '1px solid #1a2030', padding: '0.65rem 0.85rem',
              borderRadius: '0.5rem', width: '100%', fontSize: '0.85rem',
              outline: 'none', cursor: selectedDistrict ? 'pointer' : 'not-allowed',
              opacity: selectedDistrict ? 1 : 0.5
            }}
          >
            <option value="">Select Block...</option>
            {blocks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: '0.4rem', display: 'block' }}>
            🏡 PANCHAYAT
          </label>
          <select
            value={selectedPanchayat}
            onChange={(e) => setSelectedPanchayat(e.target.value)}
            disabled={!selectedBlock}
            style={{
              background: '#0f1420', color: '#e2e8f0',
              border: '1px solid #1a2030', padding: '0.65rem 0.85rem',
              borderRadius: '0.5rem', width: '100%', fontSize: '0.85rem',
              outline: 'none', cursor: selectedBlock ? 'pointer' : 'not-allowed',
              opacity: selectedBlock ? 1 : 0.5
            }}
          >
            <option value="">Select Panchayat...</option>
            {panchayats.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
      </div>

      {/* View Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={() => {
            setSelectedDistrict('');
            setSelectedBlock('');
            setSelectedPanchayat('');
          }}
          style={{
            padding: '0.6rem 1.2rem',
            background: 'transparent',
            color: '#94a3b8',
            border: '1px solid #1a2030',
            borderRadius: '0.5rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
        <button
          onClick={handleViewForecast}
          disabled={!selectedPanchayat}
          style={{
            padding: '0.6rem 1.5rem',
            background: selectedPanchayat ? 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)' : '#1a2030',
            color: selectedPanchayat ? 'white' : '#64748b',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: selectedPanchayat ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
          }}
        >
          📊 View Forecast
        </button>
      </div>

      {/* Empty state / Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '1rem', color: '#4FC3F7', fontSize: '0.8rem' }}>
          Loading...
        </div>
      )}

      {!selectedPanchayat && !loading && (
        <div style={{ textAlign: 'center', padding: '2rem 0', color: '#64748b' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '64px', height: '64px',
            background: 'rgba(79, 195, 247, 0.1)',
            borderRadius: '1rem', marginBottom: '0.75rem',
            fontSize: '2rem'
          }}>🏠</div>
          <p style={{ fontSize: '0.8rem' }}>Please select a Panchayat to view local information.</p>
        </div>
      )}

      {selectedPanchayat && !loading && (
        <div style={{
          padding: '1rem',
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          borderRadius: '0.5rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem'
        }}>
          <span style={{ fontSize: '1.25rem' }}>✅</span>
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#22c55e' }}>Panchayat Selected!</p>
            <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Scroll down to view detailed forecast data.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Phase1_LocationSelect;
