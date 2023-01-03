import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreateProject } from './screens/CreateProject/CreateProject';
import { Landing } from './screens/Landing/Landing';
import { RegisterUserInfo } from './screens/RegisterUserInfo/RegisterUserInfo';
import { SignIn } from './screens/SignIn/SignIn';
import { SignUp } from './screens/SignUp/SignUp';
import { EmailVerify } from './screens/EmailVerify/EmailVerify';
import { Layout } from './layout/Layout';
import { AccountSettings } from './screens/AccountSettings/AccountSettings';
import { UserProfile } from './screens/UserProfile/UserProfile';
import { EditProfile } from './screens/UserProfile/EditProfile';
import { Projects } from './screens/Projects/Projects';
import { EditProject } from './screens/CreateProject/EditProject';
import { ProjectDetails } from './screens/Projects/ProjectDetails';
import { UserProjects } from './screens/UserProjects/UserProjects';

import './App.css';
import { useEffect } from 'react';
import { getOneUser, verify } from './utilities/api/users';
import { useDispatch } from 'react-redux';
import { setAuthUser, updateAuthUser } from './utilities/redux/slices/users/userSlice';
import { ExpiredLink } from './screens/ExpiredLink/ExpiredLink';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const persist = async () => {
      const user = await verify();
      dispatch(updateAuthUser);
    };
    persist();
  }, []);


  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/users/:id/expired-link" element={<ExpiredLink />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/account-settings/:id" element={<AccountSettings />} />
        <Route path="/users/:id/edit" element={<EditProfile />} />
        <Route path="/users/:id/account-setup" element={<RegisterUserInfo />} />
        <Route path="/users/projects" element={<UserProjects />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id/edit" element={<EditProject />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    </Layout>
  );
}

export default App;
