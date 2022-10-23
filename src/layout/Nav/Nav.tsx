import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import './Nav.scss';

const Nav: React.FC = () => {
  const authUser = useSelector(selectAuthUser);

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
          <Link to="/projects/create">Create Project</Link>
        </div>
        {authUser && (
          <div>
            <Link to={`/users/${authUser._id}`}>User Profile</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
