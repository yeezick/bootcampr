import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProjectInterface } from '../../utilities/types/ProjectInterface';
import { emptyProject, emptyProjectOwner } from '../../utilities/data/constants';
import { getOneUser } from '../../utilities/api/users';
import { getOneProject } from '../../utilities/api/projects';

export const ProjectDetails: React.FC = (): JSX.Element => {
  const [project, setProject] = useState<ProjectInterface>(emptyProject);
  const [projectOwner, setProjectOwner] = useState(emptyProjectOwner);

  const params = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      const singleProject = await getOneProject(params.id);
      let projectOwner = await getOneUser(singleProject.project_owner);
      projectOwner = {
        firstName: projectOwner.firstName,
        lastName: projectOwner.lastName,
        _id: projectOwner._id,
      };
      setProjectOwner(projectOwner);
      setProject(singleProject);
    };
    fetchProject();
  }, []);

  if (!project._id) <h1>Loading project or none found...</h1>;

  const { duration, meeting_cadence, overview, technologies_used, title } = project;
  const { firstName, lastName, _id: ownerId } = projectOwner;

  return (
    <div className="project-container">
      <Link to="/projects">Back to All Projects</Link>
      <h1>Title: {title}</h1>
      <p>Project Overview: {overview} </p>
      <p>Project Duration: {duration}</p>
      <p> Meeting Cadence: {meeting_cadence}</p>
      <p>Project Technologies: {technologies_used}</p>
      {ownerId && (
        <>
          <p>
            Project Owner: {firstName} {lastName}
          </p>
          <div>
            <Link to={`/users/${ownerId}`}>Vist Profile</Link>
          </div>
        </>
      )}
    </div>
  );
};
