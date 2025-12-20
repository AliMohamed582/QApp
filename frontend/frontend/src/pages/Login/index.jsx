import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../API/client';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // ✅ backend expects /api/auth/login
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('qapp_token', data.token);
      localStorage.setItem('qapp_user', JSON.stringify(data.user));
      navigate('/branches');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <label>Email:</label>
        <input name="email" value={form.email} onChange={onChange} required />
        <label>Password:</label>
        <input name="password" type="password" value={form.password} onChange={onChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
