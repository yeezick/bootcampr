import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import './Nav.scss';

const Nav: React.FC = () => {
  const [authLinks, setAuthLinks] = useState<boolean>(false);
  const authUser = useSelector(selectAuthUser);

  useEffect(() => {
    if (authUser) setAuthLinks(true);
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
          </>
        )}
      </nav>
    </div>
  );
};

export default Nav;
