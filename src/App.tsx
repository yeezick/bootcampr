import { useState, useEffect, FormEventHandler } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listProjects } from "./graphql/queries";
import {
  createProject as createProjectMutation,
  deleteProject as deleteProjectMutation,
} from "./graphql/mutations";

type Props = {
  signOut?: React.FunctionComponent
};
interface ProjectRefs {
  projectID: string
}
interface Project {
  id: number,
  bio: string,
  description: string,
  email:string,
  name: string,
  profilePicture: string,
  role: string, 
  supportingLinks: string,
  declinedProjects: ProjectRefs[],
  interestedProjects: ProjectRefs[],
  ownerOf: ProjectRefs[],
  savedProjects: ProjectRefs[],
}


export const App = ({ signOut }: Props) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () =>  {
    const apiData: any = await API.graphql({ query: listProjects });
    const projectsFromAPI = apiData.data.listProjects.items;
    setProjects(projectsFromAPI);
  }

  const createProject = async (event: React.SyntheticEvent<HTMLFormElement> ) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    };
    await API.graphql({
      query: createProjectMutation,
      variables: { input: data },
    });
    fetchProjects();
    event.currentTarget.reset();
  }
  

  const deleteProject = async ({ id }: any) => {
    const newProjects = projects.filter((project: Project) => project.id !== id);
    setProjects(newProjects);
    await API.graphql({
      query: deleteProjectMutation,
      variables: { input: { id } },
    });
  }
// replace AWS components with standard React
  return (
    <div className="App">
      <Heading level={1}>My Projects</Heading>
      <h1>My Projects</h1>
      <form onSubmit={createProject}>
        <div style={{display: "flex", justifyContent:"center", margin:"3rem 0"}}>
          {/* AWS had the labels hidden and instead defined by the placeholder */}
          <label>Project Name</label>
          <input type="text" placeholder="Project Name" required />

          <label>Description</label>
          <input type="text" placeholder="Project Description" required />

          <button>Create Project</button>
        </div>
      </form>
        <h2>View Projects</h2>
        <div style={{margin: "3rem 0"}}>
          {projects.map((project: Project, mapIdx) => (
            <div style={{display: "flex", justifyContent:"center", alignItems: "center"}} key={mapIdx}>
            <Text as="strong" fontWeight={700}>
              {project.name}
            </Text>
            <Text as="span">{project.description}</Text>
            <Button variation="link" onClick={() => deleteProject(project)}>
              Delete project
            </Button>
            </div>
          ))}
        </div>
        <Button onClick={signOut}>Sign Out</Button>
    </div>
  )
}

export default withAuthenticator(App);