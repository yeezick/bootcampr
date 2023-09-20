import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import { BsLink45Deg } from 'react-icons/bs'
import { RiGithubLine } from 'react-icons/ri'
import { FiLinkedin } from 'react-icons/fi'
import './UserProfile.scss'
import { useState, useEffect } from 'react'
import { getOneUser } from 'utils/api'

export const UserProfile: React.FC = () => {
  const profileId = useParams()
  const [userProfileInfo, setUser] = useState<any>()
  const authUser = useSelector(selectAuthUser)
  const navigate = useNavigate()
  useEffect(() => {
    async function getUser() {
      console.log(profileId?.id)
      const response = await getOneUser(profileId?.id)
      const data = await response
      console.log(data)
      setUser(data)
    }
    getUser()
  }, [])

  // BC-334: should handle this case
  // if (!userProfileInfo) {
  //   return <div>Loading user... or there isn't one.</div>
  // }

  const routeToEdit = () => {
    navigate(`/users/${authUser._id}/edit`)
  }

  const sameProfile = () => (profileId?.id === authUser?._id ? true : false)

  return (
    <div className='userProfile'>
      <div className='userProfile__backContainer'>
        <IconButton
          aria-label='go back to edit profile'
          className='userProfile__backBtn'
          onClick={() => navigate(`/`)}
        >
          <ArrowBackIosNewIcon className='userProfile__backArrow' />
          <p>Back</p>
        </IconButton>
      </div>
      <h1 className='userProfile__heading'>My Profile</h1>
      <div className='userProfile__container'>
        <div className='userProfile__titleContainer'>
          <div className='userProfile__image'>
            <IconButton
              aria-label='change profile pic'
              className='userProfile__cameraIcon'
            >
              <CameraAltOutlinedIcon className='userProfile__imageChange' />
            </IconButton>
          </div>
          <div className='userProfile__title'>
            {userProfileInfo?.firstName && userProfileInfo?.lastName && (
              <h2>
                {userProfileInfo?.firstName} {userProfileInfo?.lastName}
              </h2>
            )}
            {(userProfileInfo?.role === 'Software Engineer' ||
              userProfileInfo?.role === 'UX Designer') && (
              <h3>{userProfileInfo?.role}</h3>
            )}
          </div>
          {sameProfile() ? (
            <button className='userProfile__editBtn' onClick={routeToEdit}>
              Edit Profile
            </button>
          ) : (
            <button className='userProfile__editBtn' onClick={routeToEdit}>
              Send Message
            </button>
          )}
        </div>
        <div className='userProfile__infoContainer'>
          <h3>About me</h3>
          {(userProfileInfo?.role === 'Software Engineer' ||
            userProfileInfo?.role === 'UX Designer') && (
            <p>{userProfileInfo.bio}</p>
          )}
        </div>

        <div className='userProfile__linksContainer'>
          <div className='userProfile__linkItem'>
            <BsLink45Deg className='userProfile__icons' />
            <div className='userProfile__link'>
              <h3>Portfolio</h3>
              {(userProfileInfo?.role === 'Software Engineer' ||
                userProfileInfo?.role === 'UX Designer') &&
                userProfileInfo?.links &&
                userProfileInfo?.links?.portfolioUrl && (
                  <a
                    className='userProfile__url'
                    href={userProfileInfo?.links.portfolioUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {userProfileInfo?.links?.portfolioUrl}
                  </a>
                )}
            </div>
          </div>

          <div className='userProfile__linkItem'>
            <RiGithubLine className='userProfile__icons' />
            <div className='userProfile__link'>
              <h3>Github</h3>
              {userProfileInfo?.role === 'Software Engineer' &&
                userProfileInfo?.links &&
                userProfileInfo?.links.githubUrl && (
                  <a
                    className='userProfile__url'
                    href={userProfileInfo?.links.githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {userProfileInfo?.links.githubUrl}
                  </a>
                )}
            </div>
          </div>

          <div className='userProfile__linkItem'>
            <FiLinkedin className='userProfile__icons' />
            <div className='userProfile__linkLast'>
              <h3>LinkedIn</h3>
              {(userProfileInfo?.role === 'Software Engineer' ||
                userProfileInfo?.role === 'UX Designer') &&
                userProfileInfo?.links &&
                userProfileInfo?.links.linkedinUrl && (
                  <a
                    className='userProfile__url'
                    href={userProfileInfo?.links.linkedinUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {userProfileInfo?.links.linkedinUrl}
                  </a>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
