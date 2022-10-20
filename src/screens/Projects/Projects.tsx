import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../../api/projects';
import { Link } from 'react-router-dom';

export interface IProjectProps {}

export interface Project {
  _id: String;
  title: String;
  duration: String;
  meeting_cadence: String;
  technologies_used: [String];
  project_owner: {};
}

const Projects: React.FC<IProjectProps> = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const displayAllProjects = await getAllProjects();
    setProjects(displayAllProjects);
  };

  console.log(projects);

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="project-container">
      <h1>Browse Projects</h1>
      <p>
        {projects.map((project) => {
          return (
            <li>
              <p>{project.title}</p>
              <p>{project.duration}</p>
              <p>{project.meeting_cadence}</p>
              <Link to={`/project/${project._id}`}>Learn More</Link>
            </li>
          );
        })}
      </p>
    </div>
  );
};

export default Projects;
