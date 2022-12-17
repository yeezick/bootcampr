import { Link } from 'react-router-dom';
import { ProjectInterface } from '../../utilities/types/ProjectInterface';

type UsersMemberOfProjectsProps = {
  authUserMemberOfProjects: ProjectInterface[] | null;
};

export function UsersMemberOfProjects({ authUserMemberOfProjects }: UsersMemberOfProjectsProps) {
  return (
    <div>
      {authUserMemberOfProjects && authUserMemberOfProjects.length !== 0 ? (
        authUserMemberOfProjects.map((project: ProjectInterface, idx: number) => (
          <div key={idx}>
            <Link to={`/projects/${project?._id}`}>Link of the project</Link>
            <h1>{project.title}</h1>
            <h1>{project.duration}</h1>
            <h1>{project.overview}</h1>
            <h1>{project.status}</h1>
          </div>
        ))
      ) : (
        <h1>no project yet</h1>
      )}
    </div>
  );
}
