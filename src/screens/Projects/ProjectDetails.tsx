import React, { useState, useEffect } from 'react';
import { getOneProject } from '../../utilities/api/projects';
import { ProjectInterface } from '../../utilities/Interface/ProjectInterface';
import { useParams, Link } from 'react-router-dom';
import { ProjectDetailsObject } from '../../utilities/data/constants';

export interface IProjectsProps {
  children?: JSX.Element | JSX.Element[];
}

const ProjectDetails: React.FC = (): JSX.Element => {
  const [project, setProject] = useState<ProjectInterface>(ProjectDetailsObject);

  const params = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      const displayOneProject = await getOneProject(params.id);
      setProject(displayOneProject);
    };
    fetchProject();
  }, [setProject]);

  return (
    <div className="project-container">
      <Link to="/projects">Back to All Projects</Link>
      <h1>Title: {project.title}</h1>
      <p>Project Overview: {project.overview} </p>
      <p>Project Duration: {project.duration}</p>
      <p> Meeting Cadence: {project.meeting_cadence}</p>
      <p>Project Technologies: {project.technologies_used}</p>
      <p>
        {' '}
        Project Owner:&nbsp;
        {project.project_owner ? project.project_owner.first_name : null}
        {project.project_owner ? project.project_owner.last_name : null}
      </p>
      <p>Project Owner Portfolio: {project.project_owner ? project.project_owner.portfolio_link : null}</p>
    </div>
  );
};

export default ProjectDetails;
