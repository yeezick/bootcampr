import React from "react";
import logo from "../../logo.svg";
import { getAllProjects } from "../../api/projects";

const Landing: React.FC = () => {
  const handleHello = async () => {
    const data = await getAllProjects();
    console.log(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleHello}>Click Me</button>
      </header>
    </div>
  );
};

export default Landing;
