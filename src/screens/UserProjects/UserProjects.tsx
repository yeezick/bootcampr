import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getOneUser } from '../../utilities/api/users';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { useAppSelector } from '../../utilities/redux/hooks';
import { ProjectInterface } from '../../utilities/types/ProjectInterface';
import { emptyProject, emptyProjectOwner } from '../../utilities/data/projectConstants';

export const UserProjects = () => {
  const authUser = useAppSelector(selectAuthUser);
  const { _id: userId, ownerOfProjects } = authUser;
  const [projectOwnerDetails, setProjectOwnerDetails] = useState<ProjectInterface>(emptyProject);
  const [projectOwner, setProjectOwner] = useState(emptyProjectOwner);

  const navigate = useNavigate();

  useEffect(() => {
    const getProjectOwnerDetails = async () => {
      const displayProjectOwnerDetails = await getOneUser(userId);
      let projectOwner = await getOneUser(displayProjectOwnerDetails.project_owner);
      setProjectOwner(projectOwner);
      setProjectOwnerDetails(displayProjectOwnerDetails);
    };
    getProjectOwnerDetails();
  }, [setProjectOwnerDetails]);

  console.log(projectOwnerDetails.roles);
  //   const {
  //     createdAt,
  //     duration,
  //     meeting_cadence,
  //     overview,
  //     roles,
  //     status,
  //     technologies_used,
  //     title,
  //     _id: projectId,
  //   } = projectOwnerDetails;

  return (
    <>
      {ownerOfProjects?.map((project: any) => (
        <div key={project._id}>
          <h1>{project.title}</h1>
          <Link to={`/projects/${project}/edit`}>Edit My Project</Link>
        </div>
      ))}
    </>
  );
};
