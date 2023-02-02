import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreateProject } from './screens/CreateProject/CreateProject';
import { Landing } from './screens/Landing/Landing';
import { RegisterUserInfo } from './screens/RegisterUserInfo/RegisterUserInfo';
import { SignIn } from './screens/SignIn/SignIn';
import { SignUp } from './screens/SignUp/SignUp';
import { Layout } from './layout/Layout';
import { AccountSettings } from './screens/AccountSettings/AccountSettings';
import { UserProfile } from './screens/UserProfile/UserProfile';
import { EditProfile } from './screens/UserProfile/EditProfile';
import { Projects } from './screens/Projects/Projects';
import { EditProject } from './screens/CreateProject/EditProject';
import { ProjectDetails } from './screens/Projects/ProjectDetails';
import { UserProjects } from './screens/UserProjects/UserProjects';
import { NotificationModal } from './components/Notifications/NotificationModal';
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/account-settings/:id" element={<AccountSettings />} />
        <Route path="/users/:id/edit" element={<EditProfile />} />
        <Route path="/users/:id/account-setup" element={<RegisterUserInfo />} />
        <Route path="/users/projects/:userId" element={<UserProjects />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id/edit" element={<EditProject />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/notifications" element={<NotificationModal />} />
      </Routes>
    </Layout>
  );
}

export default App;
