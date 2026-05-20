import { useState, useEffect } from 'react';
import api from '../api/axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');

  const fetchData = async () => {
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        api.get('/tasks'),
        api.get('/projects')
      ]);
      setTasks(tasksRes.data);
      setProjects(projectsRes.data);
      if (projectsRes.data.length > 0) {
        setProjectId(projectsRes.data[0]._id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', { title, description, project: projectId });
      setTitle('');
      setDescription('');
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.patch(`/tasks/${id}`, { status });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Pending': return 'badge-pending';
      case 'In Progress': return 'badge-inprogress';
      case 'Completed': return 'badge-completed';
      default: return 'badge-pending';
    }
  };

  return (
    <div>
      <h1 className="mb-4">Tasks</h1>
      
      <div className="card mb-4">
        <h3 className="mb-4">Create New Task</h3>
        <form onSubmit={handleCreate} style={{display: 'flex', gap: '1rem', flexDirection: 'column'}}>
          <div className="flex" style={{gap: '1rem', flexWrap: 'wrap'}}>
            <input 
              type="text" 
              placeholder="Task Title" 
              className="form-control" 
              style={{flex: 1}}
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
            <select 
              className="form-control" 
              style={{flex: 1}}
              value={projectId} 
              onChange={(e) => setProjectId(e.target.value)}
              required
            >
              {projects.length === 0 && <option value="">No projects available</option>}
              {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>
          </div>
          <input 
            type="text" 
            placeholder="Description" 
            className="form-control" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          <button type="submit" className="btn btn-primary" style={{alignSelf: 'flex-start'}} disabled={projects.length === 0}>
            Create Task
          </button>
        </form>
      </div>

      <div className="grid-cards">
        {tasks.map((task) => (
          <div key={task._id} className="card flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="card-title" style={{marginBottom: 0}}>{task.title}</h3>
                <span className={`badge ${getStatusBadgeClass(task.status)}`}>{task.status}</span>
              </div>
              <p style={{color: 'var(--text-muted)'}}>{task.description}</p>
              <p style={{fontSize: '0.875rem', marginTop: '0.5rem'}}>Project: <strong>{task.project?.name || 'Unknown'}</strong></p>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <select 
                className="form-control" 
                style={{width: 'auto', padding: '0.25rem 0.5rem', fontSize: '0.875rem'}}
                value={task.status}
                onChange={(e) => handleStatusUpdate(task._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button 
                onClick={() => handleDelete(task._id)} 
                className="btn btn-danger"
                style={{padding: '0.25rem 0.5rem', fontSize: '0.875rem'}}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && <p style={{color: 'var(--text-muted)'}}>No tasks found.</p>}
      </div>
    </div>
  );
};

export default Tasks;
