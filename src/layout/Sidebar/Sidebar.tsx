import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import './Sidebar.scss';

const Sidebar = () => {
  const [authLinks, setAuthLinks] = useState<boolean>(false);
  const authUser = useSelector(selectAuthUser);

  useEffect(() => {
    if (authUser) setAuthLinks(true);
  }, [authUser]);

  console.log(authUser);

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div>
          {/* profile pic */}
          <p>
            {authUser.firstName} {authUser.lastName}
          </p>
        </div>
        <Link className="link" to={`/users/${authUser._id}`}>
          My Profile
        </Link>
      </div>
      <div>
        <Link className="link" to={`/users/${authUser._id}/edit`}>
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
