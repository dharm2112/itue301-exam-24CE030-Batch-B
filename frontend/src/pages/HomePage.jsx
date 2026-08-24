import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const API_URL = 'http://localhost:5000';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, token, customer } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        login(data.customer, data.token);
        navigate('/order');
      } else {
        setError(data.message || 'Invalid email or login failed.');
      }
    } catch (err) {
      setError('Unable to connect to server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">🚀 Food Ordering System</span>

          <h1>
            Delicious Food,<br />
            <span>Delivered Fast.</span>
          </h1>

          <p>
            Browse restaurants, place your order in seconds,<br />
            and track it all in one place.
          </p>

          <div className="hero-actions">
            <Link to="/restaurants" className="btn btn-primary">
              🍽️ Explore Restaurants
            </Link>
            <a href="#login" className="btn btn-secondary">
              Sign In →
            </a>
          </div>

          {/* Login / Logged-in Card */}
          <div id="login">
            {token ? (
              <div className="logged-in-card">
                <div className="logged-in-avatar">
                  {customer?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <h2>Welcome back!</h2>
                <p>{customer?.name} — ready to order?</p>
                <Link to="/order" className="btn btn-primary btn-full">
                  🛒 Place an Order
                </Link>
              </div>
            ) : (
              <div className="hero-login-card">
                <h2>🔐 Customer Login</h2>

                {error && (
                  <div className="alert alert-error">⚠️ {error}</div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label form-label-light" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-control form-control-dark"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@example.com"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-full"
                    disabled={loading}
                  >
                    {loading ? '⏳ Logging in...' : '→ Login'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer>
        © 2025 QuickBite Food Ordering System · Built with React + Express + MongoDB
      </footer>
    </>
  );
};

export default HomePage;
