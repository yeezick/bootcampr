import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateProject from "./screens/CreateProject/CreateProject";
import "./App.css";
import Landing from "./screens/Landing/Landing";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/SignUp";

function App() {
  return (
    <Router>
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
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/projects/create" element={<CreateProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
