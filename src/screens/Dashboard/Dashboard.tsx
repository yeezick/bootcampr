import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAuthUser, setAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { getAllUsers } from '../../utilities/api/users';
import { ProjectInterface } from '../../utilities/Interface/ProjectInterface';
import { Link } from 'react-router-dom';
import { UserInterface } from '../../utilities/types/UserInterface';

const Dashboard: React.FC = () => {
  const [user, setCurrentUser] = useState<UserInterface | null>();
  const allUser = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const gettingAllUser = await getAllUsers();
      dispatch(setAuthUser(gettingAllUser[2]));
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentUser(allUser);
  }, [allUser]);
  console.log(user);

  return (
    <>
      <div>
        <h1> landing screen </h1>
        {user && (
          <>
            <h1>first name {user.firstName}</h1>
            <h1>last name {user.lastName}</h1>
            <h1>email {user.email}</h1>
            <h1>role {user.role}</h1>
            <h1>member_of_projects ...</h1>
            {user.memberOfProjects && user.memberOfProjects.length !== 0 ? (
              user.memberOfProjects.map((project, idx) => (
                <div key={idx}>
                  <Link to={`projects/${project?._id}`}>Link of the project</Link>
                  <h1>{project.title}</h1>
                  <h1>{project.duration}</h1>
                  <h1>{project.overview}</h1>
                  <h1>{project.status}</h1>
                </div>
              ))
            ) : (
              <h1>no project yet</h1>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
