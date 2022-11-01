import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserInterface } from '../../utilities/Interface/UserInterface';
import { selectAuthUser, setAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { getAllUsers } from '../../utilities/api/users';
import { ProjectInterface } from '../../utilities/Interface/ProjectInterface';
import { Link } from 'react-router-dom';

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

  return (
    <>
      <div>
        <h1> landing screen </h1>
        {user && (
          <>
            <h1>first name {user.first_name}</h1>
            <h1>last name {user.last_name}</h1>
            <h1>email {user.email}</h1>
            <h1>portfolio {user?.portfolio_link}</h1>
            <h1>role {user.role}</h1>
            <h1>member_of_projects ...</h1>
            {user?.member_of_projects.length !== 0 ? (
              user?.member_of_projects?.map((projects: ProjectInterface, id: number) => (
                <div key={id}>
                  <Link to={`/projects/${projects._id}`}>go to the project</Link>
                  <h5>{projects.title}</h5>
                  <h5>{projects.overview}</h5>
                  <h5>{projects.meeting_cadence}</h5>
                  <h5>{projects.technologies_used}</h5>
                </div>
              ))
            ) : (
              <h1>no projects yet</h1>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
