import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logoutAuthUser, selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import './Nav.scss';
import { logOut } from '../../utilities/api/users';
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks';

export const Nav: React.FC = () => {
  const [authLinks, setAuthLinks] = useState<boolean>(false);
  const authUser = useAppSelector(selectAuthUser);
  const{ _id: userId } = authUser;
  const dispatch = useAppDispatch();
  
  useEffect(() => {
     (userId) ? setAuthLinks(true) : setAuthLinks(false);
  }, [authUser]);

  const handleLogOut = () =>{
    logOut(); 
    dispatch(logoutAuthUser());
  }

  return (
    <div className="nav">
      <nav>
        <div>
          <Link to="/sign-up">Sign Up</Link>
        </div>
        <div>
          <Link to="/sign-in">Sign In</Link>
        </div>
        <div>
          <Link to="/">Landing Page</Link>
        </div>
        <div>
          <Link to="/projects">Browse Projects</Link>
        </div>
        <div>
          <Link to="/projects/create">Create Project</Link>
        </div>
        {authLinks && (
          <>
            <div>
              <Link to={`/users/${userId}`}>My Profile</Link>
            </div>
            <div>
              <Link to={`/users/${userId}/edit`}>Edit Profile</Link>
            </div>
            <div>
              <Link to="/">
                <button onClick={handleLogOut}>Logout</button>
              </Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};