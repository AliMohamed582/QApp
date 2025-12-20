import { useEffect, useState } from 'react';
import api from '../../API/client';

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [selected, setSelected] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        // ✅ backend expects /api/branches
        const { data } = await api.get('/branches');
        setBranches(data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load branches');
      }
    };
    load();
  }, []);

  const fetchPrediction = async (id) => {
    setError('');
    setPrediction(null);
    setSelected(id);
    try {
      // ✅ backend expects /api/branches/:id/prediction
      const { data } = await api.get(`/branches/${id}/prediction`);
      setPrediction(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load prediction');
    }
  };

  return (
    <div>
      <h2>Branches</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {branches.map((b) => (
          <li key={b._id}>
            {b.name} — {b.location}
            <button style={{ marginLeft: 8 }} onClick={() => fetchPrediction(b._id)}>
              Predict load
            </button>
          </li>
        ))}
      </ul>

      {selected && prediction && (
        <div style={{ marginTop: 16 }}>
          <h3>Prediction</h3>
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
