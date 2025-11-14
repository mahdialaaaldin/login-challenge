import { useState } from 'react';
import { login } from '../services/authService';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await login(email, password);
      
      if (response.success) {
        setSuccess(true);
        setError('');
        // Store token (in a real app, use more secure storage)
        localStorage.setItem('token', response.token);
        localStorage.setItem('userEmail', response.email);
        console.log('Login successful!', response);
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Navigation */}
      <nav className="navigation">
        <div className="nav-right">
          <span className="need-help">Need help?</span>
          <button className="contact-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/>
            </svg>
            Contact Us
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        {/* Header with Icon */}
        <div className="header">
          <div className="icon-wrapper">
            <div className="icon-inner">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M14 14.252V16.342C13.0949 16.022 12.1263 15.8871 11.1754 15.9462C10.2245 16.0053 9.29776 16.2569 8.46 16.684C7.62224 17.1112 6.89123 17.7037 6.31521 18.4217C5.7392 19.1396 5.3306 19.9671 5.118 20.85H3.109C3.36286 19.4348 3.96918 18.1024 4.87438 16.9677C5.77958 15.833 6.95567 14.9311 8.29622 14.3391C9.63677 13.747 11.1037 13.4821 12.5667 13.5673C14.0296 13.6525 15.4512 14.0852 16.706 14.828L14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
          
          <div className="title">
            <h1>Login</h1>
            <p>Enter your details to login.</p>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="success-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
            </svg>
            Login successful! Welcome back.
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
            </svg>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="form">
          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">
              Email address<span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3ZM20 7.238L12.072 14.338L4 7.216V19H20V7.238ZM4.511 5L12.061 11.662L19.502 5H4.511Z" fill="currentColor"/>
              </svg>
              <input
                type="email"
                id="email"
                placeholder="test@test.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">
              Password<span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 10H20C20.2652 10 20.5196 10.1054 20.7071 10.2929C20.8946 10.4804 21 10.7348 21 11V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V11C3 10.7348 3.10536 10.4804 3.29289 10.2929C3.48043 10.1054 3.73478 10 4 10H5V9C5 7.14348 5.7375 5.36301 7.05025 4.05025C8.36301 2.7375 10.1435 2 12 2C13.8565 2 15.637 2.7375 16.9497 4.05025C18.2625 5.36301 19 7.14348 19 9V10ZM17 10V9C17 7.67392 16.4732 6.40215 15.5355 5.46447C14.5979 4.52678 13.3261 4 12 4C10.6739 4 9.40215 4.52678 8.46447 5.46447C7.52678 6.40215 7 7.67392 7 9V10H17ZM11 14V18H13V14H11Z" fill="currentColor"/>
              </svg>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Sign Up Link */}
          <div className="signup-link">
            <span>Already have an account?</span>
            <a href="#" className="link-button">Login</a>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer">
        © 2024 Demo login
      </footer>
    </div>
  );
}

export default LoginPage;