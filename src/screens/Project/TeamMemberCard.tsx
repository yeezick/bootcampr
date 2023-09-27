import './TeamMemberCard.scss'
import Ellipse from '../../assets/Images/ellipse.png'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from 'components/Avatar/Avatar'
import './ProjectDetails.scss'
import {
  selectAuthUser,
  getUserProfileImage,
} from 'utils/redux/slices/userSlice'
import { useAppSelector } from 'utils/redux/hooks'

export const TeamMemberCard = (member, loggedInUserId) => {
  const authUser = useAppSelector(selectAuthUser)
  const { _id: userId } = authUser
  const navigate = useNavigate()
  const isCurrentUser = member._id === loggedInUserId

  const handleProfileNavigation = () => {
    navigate(`/users/${member._id}`)
  }

  return (
    <>
      <div className='profile-container'>
        <div className='profile-img-container'>
          <Avatar />
        </div>
        <div className='profile-info-container'>
          <div className='profile-name'>
            <label>
              {member.firstName} {member.lastName}
            </label>
          </div>
          <div className='profile-role'>
            <p>{member.role}</p>
          </div>
          <div className='profile-buttons'>
            <div className='profile-btn-container'>
              <button onClick={handleProfileNavigation} className='profile-btn'>
                Profile
              </button>
            </div>
            {isCurrentUser ? null : (
              <div className='message-btn-container'>
                <button className='message-btn'>Message</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
