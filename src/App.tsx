import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@layout/Layout';
import { Landing } from '@screens/Landing/Landing';
import { CreateProject } from '@screens/Projects';
import { EditProject } from '@screens/Projects';
import { BrowseProjects } from '@screens/Projects';
import { ProjectDetails } from '@screens/Projects';
import { UserProjects } from '@screens/Projects';
import { RegisterUserInfo } from '@screens/Auth';
import { SignIn } from '@screens/Auth';
import { SignUp } from '@screens/Auth';
import { UserProfile } from '@screens/UserProfile';
import { EditProfile } from '@screens/UserProfile';

import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/users/:id/edit" element={<EditProfile />} />
        <Route path="/users/:id/account-setup" element={<RegisterUserInfo />} />
        <Route path="/users/projects" element={<UserProjects />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/projects" element={<BrowseProjects />} />
        <Route path="/projects/:id/edit" element={<EditProject />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
