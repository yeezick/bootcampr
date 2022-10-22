import React, { useState, useEffect } from 'react';
import { getOneProject } from '../../utilities/api/projects';
import { ProjectInterface } from '../../utilities/Interface/ProjectInterface';
import { useParams, Link } from 'react-router-dom';

const ProjectDetails: React.FC = (): JSX.Element => {
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
      first_name: new String(),
      last_name: new String(),
      portfolio_link: new String(),
    },
  });
  const params = useParams();

  const fetchProject = async () => {
    const displayOneProject = await getOneProject(params.id);
    setProject(displayOneProject);
  };

  useEffect(() => {
    fetchProject();
  }, []);

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
        {project.project_owner ? project.project_owner.first_name : null}
        {project.project_owner ? project.project_owner.last_name : null}
      </p>
      <p>Project Owner Portfolio: {project.project_owner ? project.project_owner.portfolio_link : null}</p>
    </div>
  );
};

export default ProjectDetails;
