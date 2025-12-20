// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css'; // ✅ use relative path

// Components
import Header from 'frontend/components/Header'; // ✅ relative path
import ProtectedRoute from 'frontend/components/ProtectedRoute';

// Pages
import HomePage from 'frontend/pages/HomePage'; // ✅ folder name must match exactly
import Login from 'frontend/pages/Login';
import Register from 'frontend/pages/Register';
import Branches from 'frontend/pages/Branches';
import Tickets from 'frontend/pages/Tickets';
import ServiceRequests from 'frontend/pages/ServiceRequests';
import NotFoundPage from 'frontend/pages/NotFoundPage';


export default function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-container" style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/branches"
            element={
              <ProtectedRoute>
                <Branches />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <Tickets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/service-requests"
            element={
              <ProtectedRoute>
                <ServiceRequests />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}
