import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects } from '../../utilities/api/projects';
import { ProjectInterface } from '../../utilities/types/ProjectInterface';
import './Projects.scss';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const displayAllProjects = await getAllProjects();
      setProjects(displayAllProjects);
    };
    fetchProjects();
  }, [setProjects]);

  return (
    <div className="project-container">
      <h1>Browse Projects</h1>
      <ul>
        {projects.map((project: any) => {
          return (
            <li key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.technologies_used}</p>
              <p>{project.duration}</p>
              <Link to={`/projects/${project._id}`}>Learn More</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
