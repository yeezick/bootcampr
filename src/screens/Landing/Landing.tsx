import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../../api/projects';
import { useSelector } from 'react-redux';
import { UserInterface } from './UserInterface/UserInterface';
import { loggedUser } from '../../app/features/users/userSlice';

const Landing: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserInterface>();
  const userLogged = useSelector(loggedUser);

  useEffect(() => {
    userLogged.then((res: any) => setCurrentUser(res));
  }, [currentUser]);

  return (
    <>
      <div>
        <h1>first name {currentUser?.first_name}</h1>
        <h1>last name {currentUser?.last_name}</h1>
        <h1>email {currentUser?.email}</h1>
        <h1>portfolio {currentUser?.portfolio_link}</h1>
        <h1>role {currentUser?.role}</h1>
      </div>
      <h1>member_of_projects ...</h1>
      {currentUser?.member_of_projects?.map((projects: any, id: number) => (
        <div key={id}>
          <h5>{projects.description}</h5>
          <h5>{projects.title}</h5>
          <h5>{projects.time_commitment}</h5>
          <h5>{projects.designer_count}</h5>
          <h5>{projects.engineer_count}</h5>
        </div>
      ))}
      <h1>member_of_projects ...</h1>
    </>
  );
};

export default Landing;
