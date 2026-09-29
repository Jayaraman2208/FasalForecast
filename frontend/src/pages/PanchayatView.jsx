import { useParams } from 'react-router-dom';

const PanchayatView = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text mb-8">📍 Panchayat #{id}</h1>
        <div className="glass rounded-2xl p-8">
          <p className="text-gray-400">Detailed view coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default PanchayatView;
