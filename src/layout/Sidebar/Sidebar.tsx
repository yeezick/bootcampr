import React, { useEffect, useState } from 'react';
import { logoutAuthUser, selectAuthUser, toggleSidebar } from '../../utilities/redux/slices/users/userSlice';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import { AiFillStar } from 'react-icons/ai';
import { logOut } from '../../utilities/api/users';
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = (props: SidebarProps) => {
  const authUser = useAppSelector(selectAuthUser);
  const { _id: userId, firstName, lastName } = authUser;
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    logOut();
    dispatch(logoutAuthUser());
    props.toggleSidebar();
  };

  return (
    <div className={props.isOpen ? 'sidebar-container active' : 'hide-sidebar'}>
      <div className="menu-btn" onClick={props.toggleSidebar}>
        <i></i>
        <i></i>
        <i></i>
      </div>

      <div className="current-user">
        <div className="image"></div>
        <div>
          <p className="user-name">
            {firstName} {lastName}
          </p>

          <Link className="edit-profile" to={`/users/${userId}/edit`}>
            Edit Profile
          </Link>
        </div>
      </div>
      <div className="nav-links">
        <Link className="link" to={`/users/${userId}`}>
          <AiFillStar size={18} viewBox={'0 0 1024 900'} /> My Profile
        </Link>
        <Link className="link" to={`/`}>
          <AiFillStar size={18} /> My Projects
        </Link>
        <Link className="link" to={`/`}>
          <AiFillStar size={18} /> My Applications
        </Link>
        <Link className="link" to={`/`} onClick={handleLogout}>
          <AiFillStar size={18} /> Sign Out
        </Link>
      </div>
    </div>
  );
};
