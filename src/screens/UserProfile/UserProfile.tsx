import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Avatar from 'components/Avatar/Avatar'
// import ImageEditorModal from 'components/ImageEditorModal/ImageEditorModal'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { BsLink45Deg } from 'react-icons/bs'
import { RiGithubLine } from 'react-icons/ri'
import { FiLinkedin } from 'react-icons/fi'
import './UserProfile.scss'

export const UserProfile: React.FC = () => {
  const authUser = useSelector(selectAuthUser)
  const navigate = useNavigate()

  // BC-334: should handle this case
  if (!authUser) {
    return <div>Loading user... or there isn't one.</div>
  }

  const shouldShowName = authUser && authUser.firstName && authUser.lastName

  const shouldShowRole =
    authUser &&
    (authUser.role === 'Software Engineer' || authUser.role === 'UX Designer')

  const shouldShowBio = shouldShowRole && authUser && authUser.bio

  const shouldShowPortfolioUrl =
    shouldShowRole && authUser && authUser.links && authUser.links.portfolioUrl

  const shouldShowGithubUrl =
    authUser &&
    authUser.role === 'Software Engineer' &&
    authUser.links &&
    authUser.links.githubUrl

  const shouldShowLinkedInUrl =
    shouldShowRole && authUser && authUser.links && authUser.links.linkedinUrl

  const routeToEdit = () => {
    navigate(`/users/${authUser._id}/edit`)
  }

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
            <Avatar hasIcon={false} clickable={false} />
          </div>
          <div className='userProfile__title'>
            {shouldShowName && (
              <h2>
                {authUser.firstName} {authUser.lastName}
              </h2>
            )}
            {shouldShowRole && <h3>{authUser.role}</h3>}
          </div>
          <button className='userProfile__editBtn' onClick={routeToEdit}>
            Edit Profile
          </button>
        </div>
        <div className='userProfile__infoContainer'>
          <h3>About me</h3>
          {shouldShowBio && <p>{authUser.bio}</p>}
        </div>

        <div className='userProfile__linksContainer'>
          <div className='userProfile__linkItem'>
            <BsLink45Deg className='userProfile__icons' />
            <div className='userProfile__link'>
              <h3>Portfolio</h3>
              {shouldShowPortfolioUrl && (
                <a
                  className='userProfile__url'
                  href={authUser.links.portfolioUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {authUser.links.portfolioUrl}
                </a>
              )}
            </div>
          </div>

          <div className='userProfile__linkItem'>
            <RiGithubLine className='userProfile__icons' />
            <div className='userProfile__link'>
              <h3>Github</h3>
              {shouldShowGithubUrl && (
                <a
                  className='userProfile__url'
                  href={authUser.links.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {authUser.links.githubUrl}
                </a>
              )}
            </div>
          </div>

          <div className='userProfile__linkItem'>
            <FiLinkedin className='userProfile__icons' />
            <div className='userProfile__linkLast'>
              <h3>LinkedIn</h3>
              {shouldShowLinkedInUrl && (
                <a
                  className='userProfile__url'
                  href={authUser.links.linkedinUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {authUser.links.linkedinUrl}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
