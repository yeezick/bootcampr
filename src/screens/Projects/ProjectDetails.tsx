import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOneProject } from '../../utilities/api/projects';
import { ProjectInterface } from '../../utilities/types/ProjectInterface';

export const ProjectDetails: React.FC = (): JSX.Element => {
  const [project, setProject] = useState<ProjectInterface>({
    id: new String(),
    title: new String(),
    duration: new String(),
    meeting_cadence: new String(),
    overview: new String(),
    technologies_used: [],
    createdAt: new String(),
    updatedAt: new String(),
    project_owner: {
      firstName: new String(),
      lastName: new String(),
      portfolioUrl: new String(),
    },
  });
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
        Project Owner:
        {project.project_owner ? project.project_owner.firstName : null}
        {project.project_owner ? project.project_owner.lastName : null}
      </p>
      <p>Project Owner Portfolio: {project.project_owner ? project.project_owner.portfolioUrl : null}</p>
    </div>
  );
};
