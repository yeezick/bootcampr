import React, { useState } from 'react';
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
    const displayOneProject = await getOneProject(id);
  };
  return <div>ProjectDetails</div>;
};

export default ProjectDetails;
