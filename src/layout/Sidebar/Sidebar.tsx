import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import './Sidebar.scss';
import { AiFillStar } from 'react-icons/ai';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = (props: SidebarProps) => {
  const authUser = useSelector(selectAuthUser);

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
            {authUser.firstName ? authUser.firstName : 'Wiggly'} {authUser.lastName ? authUser.lastName : 'Jones'}
          </p>

          <Link className="edit-profile" to={`/users/${authUser._id}/edit`}>
            Edit Profile
          </Link>
        </div>
      </div>
      <div className="nav-links">
        <Link className="link" to={`/`}>
          <AiFillStar size={18} viewBox={'0 0 1024 900'} /> My Profile
        </Link>
        <Link className="link" to={`/`}>
          <AiFillStar size={18} /> My Projects
        </Link>
        <Link className="link" to={`/`}>
          <AiFillStar size={18} /> My Applications
        </Link>
        <Link className="link" to={`/}`}>
          <AiFillStar size={18} /> Sign Out
        </Link>
      </div>
    </div>
  );
};
