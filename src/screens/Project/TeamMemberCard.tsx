import './TeamMemberCard.scss'
import Ellipse from '../../assets/Images/ellipse.png'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'components/Avatar/Avatar'
import './ProjectDetails.scss'
import {
  selectAuthUser,
  getUserProfileImage,
} from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'

export const TeamMemberCard = () => {
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId } = authUser

  return (
    <>
      <div className='profile-container'>
        <div className='profile-img-container'>
          <Avatar />
        </div>
        <div className='profile-info-container'>
          <div className='profile-name'>
            <label>
              {authUser.firstName} {authUser.lastName}
            </label>
          </div>
          <div className='profile-role'>
            <p>{authUser.role}</p>
          </div>
          <div className='profile-buttons'>
            <div className='profile-btn-container'>
              <Link to={`/users/${userId}`}>
                <button className='profile-btn'>Profile</button>
              </Link>
            </div>
            <div className='message-btn-container'>
              <button className='message-btn'>Message</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
