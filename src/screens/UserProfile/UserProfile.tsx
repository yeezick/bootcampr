import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
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
            <IconButton
              aria-label='change profile pic'
              className='userProfile__cameraIcon'
            >
              <CameraAltOutlinedIcon className='userProfile__imageChange' />
            </IconButton>
          </div>
          <div className='userProfile__title'>
            <h2>
              {authUser.firstName ? authUser.firstName : 'Jeanine'}{' '}
              {authUser.lastName ? authUser.lastName : 'Bootcampr'}
            </h2>
            <h3>UX Designer {authUser.role}</h3>
          </div>
          <button className='userProfile__editBtn' onClick={routeToEdit}>
            Edit Profile
          </button>
        </div>
        <div className='userProfile__infoContainer'>
          <h3>About me</h3>
          {authUser.role === 'Software Engineer' && <p>{authUser.bio}</p>}
          <p>
            I’m writing some jibberish to see what 500 characters looks like. I
            like pizza. My favorite is New York style. Have you ever been to
            NYC? Love getting me a slice there. It’s the best. A controversial
            topic in regards to pizza is whether or not pineapple should be a
            topping. My thought is if it floats your boat, go for it. I’m not
            going to admonish you for eating pizza with that topping, but I’m
            not a fan of that. Speaking of controversy, Coke or Pepsi. The
            answer is Coke. No debate there. Haha!!
          </p>
        </div>

        <div className='userProfile__linksContainer'>
          <div className='userProfile__linkItem'>
            <BsLink45Deg className='userProfile__icons' />
            <div>
              <h3>Portfolio</h3>
              {authUser.role === 'Software Engineer' && (
                <p className='userProfile__p'>
                  {authUser.portfolioUrl ? authUser.portfolioUrl : 'N/A'}
                </p>
              )}
              <p className='userProfile__p'>https://myportfoliokicksass.com</p>
            </div>
          </div>

          <div className='userProfile__linkItem'>
            <RiGithubLine className='userProfile__icons' />
            <div>
              <h3>Github</h3>
              {authUser.role === 'Software Engineer' && (
                <p className='userProfile__p'>
                  {authUser.githubUrl ? authUser.githubUrl : 'N/A'}
                </p>
              )}
              <p className='userProfile__p'>N/A</p>
            </div>
          </div>

          <div className='userProfile__linkItem'>
            <FiLinkedin className='userProfile__icons' />
            <div>
              <h3>LinkedIn</h3>
              {authUser.role === 'Software Engineer' && (
                <p>{authUser.linkedinUrl ? authUser.linkedinUrl : 'N/A'}</p>
              )}
              <p>https://www.linkedin.com/in/jeaninebootcampr/</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
