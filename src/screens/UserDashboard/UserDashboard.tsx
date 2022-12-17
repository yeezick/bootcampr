import React from 'react';
import { useAppSelector } from '../../utilities/redux/hooks';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { UsersMemberOfProjects } from './UserMemberOfProjects';
import { ProjectInterface } from '../../utilities/types/ProjectInterface';

export function UserDashboard({}) {
  const authUser = useAppSelector(selectAuthUser);

  return (
    <div>
      {authUser && (
        <>
          <h1>first name {authUser.firstName}</h1>
          <img src={authUser.profilePicture} alt={`${authUser.firstName} profileImage`} width="200px" height="200px" />
          <h1>last name {authUser.lastName}</h1>
          <h1>email {authUser.email}</h1>
          <h1>role {authUser.role}</h1>
          <UsersMemberOfProjects authUserMemberOfProjects={authUser?.memberOfProjects as ProjectInterface[]} />
        </>
      )}
    </div>
  );
}
