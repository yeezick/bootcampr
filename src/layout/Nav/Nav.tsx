import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logoutAuthUser, selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import './Nav.scss';
import { logOut } from '../../utilities/api/users';
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks';

export const Nav: React.FC = () => {
  const [authLinks, setAuthLinks] = useState<boolean>(false);
  const authUser = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
     (authUser._id) ? setAuthLinks(true) : setAuthLinks(false);
  }, [authUser]);

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
              <Link to={`/users/${authUser._id}`}>My Profile</Link>
            </div>
            <div>
              <Link to={`/users/${authUser._id}/edit`}>Edit Profile</Link>
            </div>
            <div>
              <Link to="/">
                <button onClick={() => [logOut(), dispatch(logoutAuthUser())]}>Logout</button>
              </Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};