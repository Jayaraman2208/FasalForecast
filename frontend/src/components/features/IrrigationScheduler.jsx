import { useState } from 'react';
import axios from 'axios';

const IrrigationScheduler = () => {
  const [schedule, setSchedule] = useState(null);
  const [crop, setCrop] = useState('paddy');
  const [stage, setStage] = useState('flowering');

  const calculate = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/irrigation/schedule/', {
        crop, growth_stage: stage,
        weather: { temp: 28, humidity: 75, wind: 2, rainfall: 5 },
      });
      setSchedule(res.data);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="card-dark">
      <div className="card-dark-header">
        <div>
          <h3 className="card-dark-title">💧 Smart Irrigation Scheduler</h3>
          <p className="card-dark-subtitle">Water requirement based on crop + weather</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <select value={crop} onChange={(e) => setCrop(e.target.value)} className="select-field">
          <option value="paddy">Paddy</option>
          <option value="cotton">Cotton</option>
          <option value="sugarcane">Sugarcane</option>
          <option value="groundnut">Groundnut</option>
          <option value="maize">Maize</option>
        </select>
        <select value={stage} onChange={(e) => setStage(e.target.value)} className="select-field">
          <option value="sowing">Sowing</option>
          <option value="vegetative">Vegetative</option>
          <option value="flowering">Flowering</option>
          <option value="harvest">Harvest</option>
        </select>
      </div>

      <button onClick={calculate} className="insight-btn" style={{ width: '100%' }}>
        Calculate Schedule
      </button>

      {schedule && (
        <div style={{ marginTop: '0.75rem', padding: '0.85rem', background: schedule.irrigation_needed ? 'rgba(251, 192, 45, 0.1)' : 'rgba(34, 197, 94, 0.1)', borderRadius: '0.5rem' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: schedule.irrigation_needed ? '#FBC02D' : '#22c55e', marginBottom: '0.5rem' }}>
            {schedule.irrigation_needed ? '💧 Irrigation Needed' : '✅ No Irrigation Needed'}
          </p>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Water Requirement:</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>{schedule.water_requirement_mm}mm</span>
            </div>
            {schedule.best_time && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Best Time:</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{schedule.best_time}</span>
              </div>
            )}
            {schedule.duration_minutes && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Duration:</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{schedule.duration_minutes} min</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Water Saved:</span>
              <span style={{ color: '#22c55e', fontWeight: 600 }}>{schedule.water_saved_percent}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IrrigationScheduler;
