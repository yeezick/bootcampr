import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks';
import { toggleSidebar } from '../../utilities/redux/slices/users/userSlice';
import Logo from '../../assets/Logo.svg';
import './Nav.scss';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Nav = (props: SidebarProps) => {
  const authUser = useAppSelector(selectAuthUser);
  const { _id: userId } = authUser;
  const dispatch = useAppDispatch();

  const toggleSidebarHandler = () => {
    props.toggleSidebar();
  };

  return (
    <nav>
      <div className="nav-container">
        {userId !== '' ? (
          <div className="menu-btn" onClick={toggleSidebarHandler}>
            <i></i>
            <i></i>
            <i></i>
          </div>
        ) : null}
        <div className="logo">
          <img src={Logo} />
        </div>
      </div>
      <div className="nav-links">
        <div>
          <Link className="link" to="/">
            Landing Page
          </Link>
        </div>
        <div>
          <Link className="link" to="/projects">
            Browse Projects
          </Link>
        </div>
        <div>
          <Link className="link" to="/projects/create">
            Create Project
          </Link>
        </div>
      </div>
      {userId !== '' ? null : (
        <div className="auth-btn">
          <div>
            <Link className="link sign-up" to="/sign-up">
              Sign up
            </Link>
          </div>

          <div>
            <Link className="link log-in" to="/sign-in">
              Log in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
