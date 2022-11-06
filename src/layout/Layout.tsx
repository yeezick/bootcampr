import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Nav from './Nav/Nav';
import './Layout.scss';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="layout-container">
      <Nav />
      <Sidebar />
      <div>{children};</div>
    </div>
  );
};
