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
  const [authLinks, setAuthLinks] = useState<boolean>(false);
  const authUser = useSelector(selectAuthUser);

  console.log(props);

  useEffect(() => {
    if (authUser) setAuthLinks(true);
  }, [authUser]);

  console.log(authUser);

  return (
    <div className="sidebar-container">
      <div className="sidebar">
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
    </div>
  );
};
