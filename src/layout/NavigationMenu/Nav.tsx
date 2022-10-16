import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";

const NavigationMenu: React.FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/">Landing Page</Link>
          </li>
          <li>
            <Link to="/projects/create">Create Project</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationMenu;
