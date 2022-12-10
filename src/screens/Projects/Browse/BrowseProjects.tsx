import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProjects } from '@utilities/api';
import { ProjectInterface } from '@utilities/types';
import './Projects.scss';

export const BrowseProjects: React.FC = () => {
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
              {project.technologies_used.map((technologies: any, index: any) => {
                return (
                  <span className="technologies" key={index}>
                    {technologies}
                    {'  '}
                  </span>
                );
              })}
              <p>{project.duration}</p>
              <Link to={`/projects/${project._id}`}>Learn More</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
