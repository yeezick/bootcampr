import React, { useEffect, useState } from 'react';
import logo from '../../logo.svg';
import { getAllProjects } from '../../api/projects';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../app/features/users/userSlice';
import { UserInterface } from './UserInterface/UserInterface';
const Landing: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserInterface>();
  const handleHello = async () => {
    const data = await getAllProjects();
  };
  let dispatch = useDispatch();
  const loggedUser = useSelector((state: any) => state.users.users);
  useEffect(() => {
    loggedUser.then((res: any) => setCurrentUser(res));
  }, []);
  return (
    <>
      <div>
        <div>{currentUser?.first_name}</div>
      </div>
    </>
  );
};

export default Landing;
