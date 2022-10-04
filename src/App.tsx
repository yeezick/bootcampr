import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateProject from "./screens/CreateProject/CreateProject";
import "./App.css";
import Landing from "./screens/Landing/Landing";
import SignIn from "./screens/SignIn/SignIn";
import SignUp from "./screens/SignUp/SignUp";
import NavigationMenu from "./layout/NavigationMenu/NavigationMenu";

function App() {
  return (
    <Router>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/projects/create" element={<CreateProject />} />
      </Routes>
    </Router>
  );
}

export default App;
