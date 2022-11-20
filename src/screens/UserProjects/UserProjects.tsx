import { Link } from 'react-router-dom';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { useAppSelector } from '../../utilities/redux/hooks';
import './UserProjects.scss';

export const UserProjects = () => {
  const authUser = useAppSelector(selectAuthUser);
  const { ownerOfProjects } = authUser;

  console.log(ownerOfProjects);

  return (
    <div className="projects-container">
      {ownerOfProjects?.map((project: any) => (
        <div key={project._id}>
          <h1>{project.title}</h1>
          <div className="status">
            <p>Status</p>
            <p>{project.status}</p>
            <button>
              <Link to={`/projects/${project._id}/edit`}>Edit My Project</Link>
            </button>
          </div>
          <div>
            <button>PROJECT DETAILS</button>
            <button>ROLES</button>
            <button>MEETINGS</button>
          </div>
          <p className="subheading">Description</p>
          <p>{project.overview}</p>
          <p className="subheading">Industry</p>
          <p className="subheading">Technologies Used</p>
          <p>{project.technologies_used}</p>
        </div>
      ))}
    </div>
  );
};
