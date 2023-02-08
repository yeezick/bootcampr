import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './screens/Landing/Landing';
import { RegisterUserInfo } from './screens/RegisterUserInfo/RegisterUserInfo';
import { SignIn } from './screens/SignIn/SignIn';
import { SignUp } from './screens/SignUp/SignUp';
import { Layout } from './layout/Layout';
import { AccountSettings } from './screens/AccountSettings/AccountSettings';
import { UserProfile } from './screens/UserProfile/UserProfile';
import { EditProfile } from './screens/UserProfile/EditProfile';
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
        <Route path="/notifications" element={<NotificationModal />} />
      </Routes>
    </Layout>
  );
}

export default App;
