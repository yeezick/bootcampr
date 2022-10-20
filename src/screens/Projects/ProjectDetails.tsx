import React, { useState, useEffect } from 'react';
import { getOneProject } from '../../api/projects';
import { Project } from './Projects';
import { useParams } from 'react-router-dom';

export interface DetailsProps {}

const ProjectDetails: React.FC = (): JSX.Element => {
  const [project, setProject] = useState<Project>({
    id: null,
    title: new String(),
    duration: new String(),
    meeting_cadence: new String(),
    technologies_used: [new String()],
    project_owner: [new String()],
  });
  const params = useParams();

  const fetchProject = async () => {
    const displayOneProject = await getOneProject(params.id);
    setProject(displayOneProject);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  console.log(project);

  return (
    <div className="project-container">
      <h1>Browse Projects</h1>
      <p>{project.title}</p>
      <p>{project.duration}</p>
      <p>{project.meeting_cadence}</p>
      <p>{project.technologies_used}</p>
    </div>
  );
};

export default ProjectDetails;
