import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

const Nav: React.FC = () => {
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
        <div>
          <Link to="/projects/:id">Edit Project</Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
