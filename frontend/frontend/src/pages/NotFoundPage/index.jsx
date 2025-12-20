import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p style={{ marginTop: 20 }}>
        <Link to="/">Click here to go home.</Link>
      </p>
    </div>
  );
}
