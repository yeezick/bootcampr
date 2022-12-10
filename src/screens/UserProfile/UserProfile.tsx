import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ProjectInterface } from '@utilities/types';
import { selectAuthUser } from '@utilities/redux/slices/users/userSlice';

export const UserProfile = () => {
  const authUser = useSelector(selectAuthUser);
  const navigate = useNavigate();

  // BC-334: should handle this case
  if (!authUser) {
    return <div>Loading user... or there isn't one.</div>;
  }

  const routeToEdit = () => {
    navigate(`/users/${authUser._id}/edit`);
  };

  return (
    <div>
      <h1>first name {authUser.firstName}</h1>
      <h1>last name {authUser.lastName}</h1>
      <button onClick={routeToEdit}>Edit Profile</button>
      <h1>email {authUser.email}</h1>
      <h1>portfolio {authUser?.portfolioUrl}</h1>
      <h1>role {authUser.role}</h1>

      <h1>memberOfProjects ...</h1>
      {authUser.memberOfProjects?.map((projects: ProjectInterface, id: number) => (
        <div key={`userprofile-memberof-${id}`}>
          <h5>title: {projects.title}</h5>
          <h5>project owner: {JSON.stringify(projects.project_owner)}</h5>
          <h5>overview: {projects.overview}</h5>
          <h5>duration: {projects.duration}</h5>
          <h5>meeting cadence: {projects.meeting_cadence}</h5>
          <h5>technologies used: {projects.technologies_used}</h5>
        </div>
      ))}
    </div>
  );
};
