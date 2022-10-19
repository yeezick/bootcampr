import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Project, UserInterface } from '../../utilities/Interface/UserInterface';
import { selectAuthUser, setAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { getAllUsers } from '../../utilities/api/users';

const Landing: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserInterface | null>();
  const allUser = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const gettingAllUser = await getAllUsers();
      dispatch(setAuthUser(gettingAllUser[0]));
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentUser(allUser);
    console.log(allUser);
  }, [allUser]);

  return (
    <>
      <div>
        <h1> landing screen </h1>
        {currentUser && (
          <>
            <h1>first name {currentUser.first_name}</h1>
            <h1>last name {currentUser.last_name}</h1>
            <h1>email {currentUser.email}</h1>
            <h1>portfolio {currentUser?.portfolio_link}</h1>
            <h1>role {currentUser.role}</h1>
            <h1>member_of_projects ...</h1>
            {currentUser?.member_of_projects?.map((projects: Project, id: number) => (
              <div key={id}>
                <h5>{projects.description}</h5>
                <h5>{projects.title}</h5>
                <h5>{projects.time_commitment}</h5>
                <h5>{projects.designer_count}</h5>
                <h5>{projects.engineer_count}</h5>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Landing;
