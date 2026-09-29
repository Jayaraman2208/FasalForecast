import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import Topbar from './components/common/Topbar';
import Phase1_LocationSelect from './components/phases/Phase1_LocationSelect';
import Phase2_DataOverview from './components/phases/Phase2_DataOverview';
import Phase3_ForecastDeepDive from './components/phases/Phase3_ForecastDeepDive';
import Phase4_FarmingAdvisory from './components/phases/Phase4_FarmingAdvisory';
import Phase5_Analytics from './components/phases/Phase5_Analytics';
import PestPrediction from './components/features/PestPrediction';
import IrrigationScheduler from './components/features/IrrigationScheduler';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <Phase1_LocationSelect />
            <Phase2_DataOverview />
          </>
        );
      case 'forecast':
        return <Phase3_ForecastDeepDive />;
      case 'advisory':
        return <Phase4_FarmingAdvisory />;
      case 'panchayat':
        return <Phase1_LocationSelect />;
      case 'analytics':
        return <Phase5_Analytics />;
      case 'pest':
        return (
          <div className="dashboard-grid">
            <PestPrediction panchayatId={1} />
            <IrrigationScheduler />
          </div>
        );
      case 'irrigation':
        return <IrrigationScheduler />;
      case 'alerts':
        return <Phase3_ForecastDeepDive />;
      case 'admin':
        window.open('http://127.0.0.1:8000/admin', '_blank');
        return <Phase1_LocationSelect />;
      default:
        return <Phase1_LocationSelect />;
    }
  };

  return (
    <Router>
      <div className="dashboard-layout">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="main-content">
          <Topbar />
          <main className="content-area">
            <div className="page-header">
              <p className="breadcrumb">⚡ HYPERLOCAL WEATHER INTELLIGENCE</p>
              <h1>
                Good morning, <span className="accent">Jay</span>.
              </h1>
              <p>
                Monitor your panchayat-level weather forecasts, farming advisories, and make
                smarter agricultural decisions from one intelligent command center.
              </p>
              <div className="page-header-action">
                <div></div>
                <button
                  className="insight-btn"
                  style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}
                  onClick={() => setActiveSection('forecast')}
                >
                  + New Forecast
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
