import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../../api/projects';

const Projects = () => {
  const [projects, setProjects] = useState<any>({});

  useEffect(() => {
    const fetchProjects = async () => {
      const displayAllProjects = await getAllProjects();
      setProjects(displayAllProjects);
    };
    fetchProjects();
  }, [setProjects]);

  // console.log(projects);

  return (
    <div>
      <h1>Browse Projects</h1>
      <ul>
        {projects.map((project: any) => {
          return (
            <li>
              <p>{project.title}</p>
              <p>{project.overview}</p>
              <p>{project.meeting_cadence}</p>
              <p>{project.duration}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Projects;
