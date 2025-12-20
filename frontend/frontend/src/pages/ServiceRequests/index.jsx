import { useEffect, useState } from 'react';
import api from '../../API/client';

export default function ServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    branchId: '',
    serviceType: 'card_request',
    cardType: 'debit',
    scheduledAt: '',
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [reqRes, branchesRes] = await Promise.all([
          api.get('/service-requests'),
          api.get('/branches'),
        ]);
        setRequests(reqRes.data);
        setBranches(branchesRes.data);
      } catch (err) {
        console.error('❌ Load error:', err);
        setError(err.response?.data?.error || 'Failed to load data');
      }
    };
    load();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const createRequest = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = JSON.parse(localStorage.getItem('qapp_user') || '{}');

      const parsedDate = new Date(form.scheduledAt);
      if (!form.branchId || isNaN(parsedDate.getTime())) {
        setError('Please select a branch and valid date/time');
        return;
      }

      const payload = {
        userId: user._id,
        branchId: form.branchId,
        serviceType: form.serviceType,
        requestType: form.serviceType,
        cardType: form.cardType,
        scheduledAt: parsedDate.toISOString(),
        status: 'pending',
      };

      const { data } = await api.post('/service-requests', payload);
      setRequests((prev) => [...prev, data]);
      setForm({
        branchId: '',
        serviceType: 'card_request',
        cardType: 'debit',
        scheduledAt: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create request');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.put(`/service-requests/${id}`, { status });
      setRequests((prev) => prev.map((r) => (r._id === id ? data : r)));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update status');
    }
  };

  const removeRequest = async (id) => {
    try {
      await api.delete(`/service-requests/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete request');
    }
  };

  return (
    <div>
      <h2>Service Requests</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={createRequest}>
        <select name="branchId" value={form.branchId} onChange={onChange} required>
          <option value="">Select branch</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        <select name="serviceType" value={form.serviceType} onChange={onChange}>
          <option value="card_request">Card Request</option>
          <option value="document_verification">Document Verification</option>
        </select>

        <select name="cardType" value={form.cardType} onChange={onChange}>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>

        <input
          name="scheduledAt"
          type="datetime-local"
          value={form.scheduledAt}
          onChange={onChange}
          required
        />

        <button type="submit">Submit request</button>
      </form>

      <ul style={{ marginTop: 16 }}>
        {requests
          .filter((r) => r.scheduledAt && !isNaN(new Date(r.scheduledAt).getTime()))
          .map((r) => (
            <li key={r._id}>
              {r.serviceType} — {r.status} — {new Date(r.scheduledAt).toLocaleString()}
              <button onClick={() => updateStatus(r._id, 'approved')}>Approve</button>
              <button onClick={() => updateStatus(r._id, 'completed')}>Complete</button>
              <button onClick={() => removeRequest(r._id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}
