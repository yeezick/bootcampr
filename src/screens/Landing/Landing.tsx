import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserInterface } from '../../utilities/Interface/UserInterface';
import { selectAuthUser, setAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { getAllUsers } from '../../utilities/api/users';
import { ProjectInterface } from '../../utilities/Interface/ProjectInterface';

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
            {currentUser?.member_of_projects?.map((projects: ProjectInterface, id: number) => (
              <div key={id}>
                <h5>{projects.title}</h5>
                <h5>{projects.overview}</h5>
                <h5>{projects.meeting_cadence}</h5>
                <h5>{projects.technologies_used}</h5>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Landing;
