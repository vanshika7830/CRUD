import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="main-layout">
      <nav className="navbar">
        <div className="container flex justify-between items-center">
          <Link to="/" className="nav-brand">TaskTracker</Link>
          <div className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Dashboard</Link>
            <Link to="/projects" className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}>Projects</Link>
            <Link to="/tasks" className={`nav-link ${location.pathname === '/tasks' ? 'active' : ''}`}>Tasks</Link>
            <span className="nav-link" style={{color: 'var(--text-muted)'}}>| {user?.name}</span>
            <button onClick={handleLogout} className="btn btn-danger" style={{padding: '0.25rem 0.75rem'}}>Logout</button>
          </div>
        </div>
      </nav>
      <main className="content container">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
