import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'components/Avatar/Avatar'
import './ProjectDetails.scss'
import {
  selectAuthUser,
  getUserProfileImage,
} from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'

//TODO: create proper image ellipse,
//TODO make team member card true to figma,
//TODO profile data functionality and how to link it to project,
//TODO style buttons,
//TODO link profile button to profile popup,
//TODO link message to chat popup based on user

//add user props

export const TeamMemberCard = () => {
  //{user, loggedInUser}
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId } = authUser
  // const isCurrentUser = authUser === loggedInUser.id

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
            {/* {isCurrentUser ? null : ( */}
            <div className='message-btn-container'>
              <button className='message-btn'>Message</button>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </>
  )
}
