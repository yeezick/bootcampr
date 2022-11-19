import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getOneUser } from '../../utilities/api/users';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { useAppSelector } from '../../utilities/redux/hooks';
import { ProjectInterface } from '../../utilities/types/ProjectInterface';
import { emptyProject } from '../../utilities/data/projectConstants';
import { UserInterface } from '../../utilities/types/UserInterface';

export const UserProjects = () => {
  const authUser = useAppSelector(selectAuthUser);
  const { _id: userId, ownerOfProjects } = authUser;
  //   const [projectOwnerDetails, setProjectOwnerDetails] = useState<UserInterface>(emptyProject);
  const navigate = useNavigate();

  console.log(ownerOfProjects);

  useEffect(() => {
    const asdf = authUser.ownerOfProjects?.map((proj) => {
      console.log(proj);
    });
  }, []);

  return (
    <>
      {ownerOfProjects?.map((project: any) => (
        <div key={project._id}>
          <h1>{project.title}</h1>
          <Link to={`/projects/${project._id}/edit`}>Edit My Project</Link>
        </div>
      ))}
    </>
  );
};
