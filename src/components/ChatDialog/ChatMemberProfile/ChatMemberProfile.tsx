import './ChatMemberProfile.scss'
import { useEffect, useState } from 'react'
import { getOneUser } from 'utils/api'
import { useAppSelector } from 'utils/redux/hooks'
import { selectSelectedMember } from 'utils/redux/slices/userSlice'
import { HiLink } from 'react-icons/hi'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

export const ChatMemberProfile = () => {
  const [memberInfo, setMemberInfo] = useState(null)
  const selectedMember = useAppSelector(selectSelectedMember)
  const { _id: memberId } = selectedMember

  useEffect(() => {
    const getMemberInfo = async () => {
      try {
        const res = await getOneUser(memberId)
        if (res) {
          setMemberInfo(res)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getMemberInfo()
  }, [memberId])

  return (
    memberInfo && (
      <div className='member-profile-container'>
        <MemberThumbnail memberInfo={memberInfo} />
        <MemberBio memberInfo={memberInfo} />
        <MemberSocials memberInfo={memberInfo} />
      </div>
    )
  )
}

const MemberThumbnail = ({ memberInfo }) => {
  const { profilePicture, firstName, lastName, role } = memberInfo

  return (
    <div className='member-grid'>
      <div className='avatar-grid'>
        <img src={profilePicture} alt='avatar' />
      </div>
      <div className='member-info-grid'>
        <h5>
          {firstName} {lastName}
        </h5>
        <p>{role}</p>
      </div>
    </div>
  )
}

const MemberBio = ({ memberInfo }) => {
  const { bio } = memberInfo

  return (
    <div className='member-bio-grid'>
      <h4>About me</h4>
      <p>{bio}</p>
    </div>
  )
}

const MemberSocials = ({ memberInfo }) => {
  const { role, links } = memberInfo
  const { portfolioUrl, githubUrl, linkedinUrl } = links

  return (
    <div className='links-container'>
      <div className='links-container grid'>
        <HiLink />
        <div>
          <p>Portfolio</p>
          <a href={portfolioUrl} target='_blank' rel='noreferrer'>
            {portfolioUrl}
          </a>
        </div>
      </div>
      {role === 'Software Engineer' && githubUrl && (
        <div className='links-container grid'>
          <FiGithub />
          <div>
            <p>GitHub</p>
            <a href={githubUrl} target='_blank' rel='noreferrer'>
              {githubUrl}
            </a>
          </div>
        </div>
      )}
      <div className='links-container grid'>
        <FiLinkedin />
        <div>
          <p>LinkedIn</p>
          <a href={linkedinUrl} target='_blank' rel='noreferrer'>
            {linkedinUrl}
          </a>
        </div>
      </div>
    </div>
  )
}
