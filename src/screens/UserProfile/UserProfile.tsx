import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserInterface } from '../../utilities/types/UserInterface';
import { ProjectInterface } from '../../utilities/types/ProjectInterface';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';

type Props = {};

export const UserProfile = (props: Props) => {
  const [userInfo, setUserInfo] = useState<UserInterface | null>(); // should be defaulted to dummy data instead of null
  const authUser = useSelector(selectAuthUser);

  useEffect(() => {
    setUserInfo(authUser);
  }, [authUser]);

  if (!authUser) {
    return <div>Loading user...</div>;
  }

  const routeToEdit = () => {};

  return (
    <div>
      <h1>first name {authUser.first_name}</h1>
      <h1>last name {authUser.last_name}</h1>
      <button>Edit Profile</button>
      <h1>email {authUser.email}</h1>
      <h1>portfolio {authUser?.portfolio_link}</h1>
      <h1>role {authUser.role}</h1>
      <h1>member_of_projects ...</h1>
      {authUser?.member_of_projects?.map((projects: ProjectInterface, id: number) => (
        <div key={`userprofile-memberof-${id}`}>
          <h5>{projects.description}</h5>
          <h5>{projects.title}</h5>
          <h5>{projects.time_commitment}</h5>
          <h5>{projects.designer_count}</h5>
          <h5>{projects.engineer_count}</h5>
        </div>
      ))}
    </div>
  );
};
