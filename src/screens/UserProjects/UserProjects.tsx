import { Link } from 'react-router-dom';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { useAppSelector } from '../../utilities/redux/hooks';
import './UserProjects.scss';

export const UserProjects = () => {
  const authUser = useAppSelector(selectAuthUser);
  const { ownerOfProjects } = authUser;

  console.log(ownerOfProjects);

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
