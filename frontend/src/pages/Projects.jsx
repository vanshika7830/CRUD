import { useState, useEffect } from 'react';
import api from '../api/axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', { name, description });
      setName('');
      setDescription('');
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="mb-4">Projects</h1>
      
      <div className="card mb-4">
        <h3 className="mb-4">Create New Project</h3>
        <form onSubmit={handleCreate} className="flex items-center" style={{gap: '1rem', flexWrap: 'wrap'}}>
          <input 
            type="text" 
            placeholder="Project Name" 
            className="form-control" 
            style={{flex: 1, minWidth: '200px'}}
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            type="text" 
            placeholder="Description" 
            className="form-control" 
            style={{flex: 2, minWidth: '200px'}}
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
          <button type="submit" className="btn btn-primary">Create Project</button>
        </form>
      </div>

      <div className="grid-cards">
        {projects.map((project) => (
          <div key={project._id} className="card flex flex-col justify-between">
            <div>
              <h3 className="card-title">{project.name}</h3>
              <p style={{color: 'var(--text-muted)'}}>{project.description}</p>
            </div>
            <button 
              onClick={() => handleDelete(project._id)} 
              className="btn btn-danger mt-4"
              style={{alignSelf: 'flex-start'}}
            >
              Delete
            </button>
          </div>
        ))}
        {projects.length === 0 && <p style={{color: 'var(--text-muted)'}}>No projects found. Create one above!</p>}
      </div>
    </div>
  );
};

export default Projects;
