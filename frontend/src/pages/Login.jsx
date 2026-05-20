import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h2 className="card-title text-center" style={{marginBottom: '1.5rem', fontSize: '1.75rem'}}>Welcome Back</h2>
        {error && <div style={{color: 'var(--danger-color)', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '1rem', padding: '0.75rem'}}>Login</button>
        </form>
        <div className="text-center mt-4">
          <p style={{color: 'var(--text-muted)'}}>Don't have an account? <Link to="/register" style={{color: 'var(--primary-color)'}}>Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
