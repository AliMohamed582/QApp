// src/components/Header/index.jsx
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

export default function Header() {
  const navigate = useNavigate();
  const isAuthed = !!localStorage.getItem('qapp_token');

  const logout = () => {
    localStorage.removeItem('qapp_token');
    localStorage.removeItem('qapp_user');
    navigate('/login');
  };

  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/branches">Branches</Link> | 
        <Link to="/tickets">Tickets</Link> | 
        <Link to="/service-requests">Service Requests</Link>
        {' | '}
        {!isAuthed ? (
          <>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={logout} className="link-button">Logout</button>
        )}
      </nav>
    </header>
  );
}
