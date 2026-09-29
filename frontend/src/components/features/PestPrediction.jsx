import { useState } from 'react';
import axios from 'axios';

const PestPrediction = ({ panchayatId }) => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const predict = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/pest/predict/', {
        temperature: 28, humidity: 75, rainfall: 5, wind_speed: 2,
        panchayat_id: panchayatId,
      });
      setPrediction(res.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const colors = {
    low: { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' },
    medium: { bg: 'rgba(251, 192, 45, 0.15)', color: '#FBC02D' },
    high: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
  };

  return (
    <div className="card-dark">
      <div className="card-dark-header">
        <div>
          <h3 className="card-dark-title">🧠 AI Pest Prediction</h3>
          <p className="card-dark-subtitle">Weather-based pest risk assessment</p>
        </div>
        <button onClick={predict} className="insight-btn">
          {loading ? 'Predicting...' : 'Predict Now'}
        </button>
      </div>

      {!prediction && (
        <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
          Click "Predict Now" to get AI-powered pest risk analysis.
        </p>
      )}

      {prediction && (
        <>
          <div style={{ padding: '0.85rem', background: colors[prediction.risk_level].bg, borderRadius: '0.5rem', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Risk Level</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: colors[prediction.risk_level].color }}>
                {prediction.risk_level.toUpperCase()}
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
              Confidence: {(prediction.confidence * 100).toFixed(0)}%
            </div>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.4rem' }}>DETECTED PESTS:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {prediction.pest_types.map((p, i) => (
                <span key={i} style={{ padding: '0.25rem 0.6rem', background: 'rgba(79, 195, 247, 0.15)', color: '#4FC3F7', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 600 }}>
                  {p.name}
                </span>
              ))}
            </div>
          </div>

          <div style={{ padding: '0.6rem', background: 'rgba(251, 192, 45, 0.1)', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#FBC02D' }}>💡 {prediction.recommendation}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default PestPrediction;
