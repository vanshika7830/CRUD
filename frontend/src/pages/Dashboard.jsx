import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ projects: 0, tasks: 0, completedTasks: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, tasksRes] = await Promise.all([
          api.get('/projects'),
          api.get('/tasks')
        ]);
        
        const completed = tasksRes.data.filter(t => t.status === 'Completed').length;
        
        setStats({
          projects: projectsRes.data.length,
          tasks: tasksRes.data.length,
          completedTasks: completed
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 style={{fontSize: '2rem'}}>Welcome, {user?.name}!</h1>
      <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>Here's what's happening with your projects today.</p>
      
      <div className="grid-cards">
        <div className="card stat-card">
          <div className="card-title">Total Projects</div>
          <div className="stat-value">{stats.projects}</div>
        </div>
        <div className="card stat-card">
          <div className="card-title">Total Tasks</div>
          <div className="stat-value">{stats.tasks}</div>
        </div>
        <div className="card stat-card">
          <div className="card-title">Completed Tasks</div>
          <div className="stat-value">{stats.completedTasks}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
