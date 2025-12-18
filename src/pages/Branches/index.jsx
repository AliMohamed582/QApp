import React, { useEffect, useState } from 'react';
import client from '../../api/client';

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedId, setSelectedId] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [predLoading, setPredLoading] = useState(false);
  const [predError, setPredError] = useState(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  async function fetchBranches() {
    setLoading(true);
    setError(null);
    try {
      const res = await client.get('/branches');
      setBranches(res.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to load branches');
    } finally {
      setLoading(false);
    }
  }

  async function handlePredict(id) {
    setSelectedId(id);
    setPrediction(null);
    setPredError(null);
    setPredLoading(true);
    try {
      const res = await client.get(`/branches/${id}/prediction`);
      setPrediction(res.data);
    } catch (err) {
      setPredError(err?.response?.data?.message || err.message || 'Prediction failed');
    } finally {
      setPredLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>Branches</h2>

      {loading && <div>Loading branches...</div>} 
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {!loading && !error && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {branches.map((b) => (
            <li
              key={b._id || b.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 6,
                padding: 12,
                marginBottom: 8,
                background: selectedId === (b._id || b.id) ? '#e6f7ff' : 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{b.name}</div>
                <div style={{ color: '#666' }}>{b.location}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  onClick={() => handlePredict(b._id || b.id)}
                  disabled={predLoading && selectedId === (b._id || b.id)}
                >
                  {predLoading && selectedId === (b._id || b.id) ? 'Predicting...' : 'Predict'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 16 }}>
        {predLoading && <div>Loading prediction...</div>}
        {predError && <div style={{ color: 'red' }}>{predError}</div>}
        {prediction && (
          <div style={{ whiteSpace: 'pre-wrap', background: '#f7f7f7', padding: 12, borderRadius: 6 }}>
            <strong>Prediction result</strong>
            <pre style={{ marginTop: 8 }}>{JSON.stringify(prediction, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
