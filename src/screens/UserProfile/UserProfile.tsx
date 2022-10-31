import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserInterface } from '../../utilities/types/UserInterface';
import { ProjectInterface } from '../../utilities/types/ProjectInterface';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { arrayBuffer, json } from 'stream/consumers';

type Props = {};

export const UserProfile = (props: Props) => {
  const [userInfo, setUserInfo] = useState<UserInterface | null>(); // should be defaulted to dummy data instead of null
  const authUser = useSelector(selectAuthUser);
  const navigate = useNavigate();

  useEffect(() => {
    setUserInfo(authUser);
  }, [authUser]);

  if (!authUser) {
    return <div>Loading user...</div>;
  }

  const routeToEdit = () => {
    navigate(`/users/${authUser._id}/edit`);
  };

  return (
    <div>
      <h1>first name {authUser.first_name}</h1>
      <h1>last name {authUser.last_name}</h1>
      <button onClick={routeToEdit}>Edit Profile</button>
      <h1>email {authUser.email}</h1>
      <h1>portfolio {authUser?.portfolio_link}</h1>
      <h1>role {authUser.role}</h1>
      <h1>member_of_projects ...</h1>
      {authUser.member_of_projects?.map((projects: ProjectInterface, id: number) => (
        <div key={`userprofile-memberof-${id}`}>
          <h5>title: {projects.title}</h5>
          <h5>project owner: {JSON.stringify(projects.project_owner)}</h5>
          <h5>overview: {projects.overview}</h5>
          <h5>duration: {projects.duration}</h5>
          <h5>meeting cadence: {projects.meeting_cadence}</h5>
          <h5>technologies used: {projects.technologies_used}</h5>
        </div>
      ))}
    </div>
  );
};
