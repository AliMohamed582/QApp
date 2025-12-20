import { useEffect, useState } from 'react';
import api from '../../API/client';

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    branchId: '',
    serviceType: 'general',
    scheduledAt: '',
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [ticketsRes, branchesRes] = await Promise.all([
          api.get('/tickets'),
          api.get('/branches'),
        ]);
        setTickets(ticketsRes.data);
        setBranches(branchesRes.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load tickets/branches');
      }
    };
    load();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const createTicket = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = JSON.parse(localStorage.getItem('qapp_user') || '{}');
      const payload = {
        userId: user._id,
        branchId: form.branchId,
        serviceType: form.serviceType,
        scheduledAt: new Date(form.scheduledAt).toISOString(), // ✅ correct field name
        status: 'waiting',
      };
      const { data } = await api.post('/tickets', payload);
      setTickets((prev) => [...prev, data]);
      setForm({ branchId: '', serviceType: 'general', scheduledAt: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create ticket');
    }
  };

  return (
    <div>
      <h2>Tickets</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={createTicket}>
        <select
          name="branchId"
          value={form.branchId}
          onChange={onChange}
          required
        >
          <option value="">Select branch</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>

        <select
          name="serviceType"
          value={form.serviceType}
          onChange={onChange}
        >
          <option value="general">General</option>
          <option value="card_request">Card Request</option>
          <option value="account_opening">Account Opening</option>
        </select>

        <input
          name="scheduledAt"
          type="datetime-local"
          value={form.scheduledAt}
          onChange={onChange}
          required
        />

        <button type="submit">Create ticket</button>
      </form>

      <ul style={{ marginTop: 16 }}>
        {tickets
          .filter((t) => t.scheduledAt && !isNaN(new Date(t.scheduledAt).getTime())) // ✅ only show valid tickets
          .map((t) => (
            <li key={t._id}>
              {t.serviceType} — {new Date(t.scheduledAt).toLocaleString()} — {t.status}
            </li>
          ))}
      </ul>
    </div>
  );
}
