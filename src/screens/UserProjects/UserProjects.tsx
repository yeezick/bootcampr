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
        <div key={project._id} className="projects">
          <h1>{project.title}</h1>
          <div className="status-container">
            <p className="status">Status</p>
            <div id="status">
              <p className="status draft-publish">{project.status}</p>
            </div>
            <button className="status edit-btn">
              <Link to={`/projects/${project._id}/edit`}>Edit</Link>
            </button>
          </div>
          <div>
            <button className="details-btn">Project Details</button>
            <button className="details-btn">Roles</button>
            <button className="details-btn">Meetings</button>
          </div>
          <hr className="divider" />
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
