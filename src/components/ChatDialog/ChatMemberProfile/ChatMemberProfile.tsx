import './ChatMemberProfile.scss'
import { useEffect, useState } from 'react'
import { getOneUser } from 'utils/api'
import { useAppSelector } from 'utils/redux/hooks'
// import { setChatUser } from 'utils/redux/slices/chatSlice'
import { HiLink } from 'react-icons/hi'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { UserThumbnail } from 'components/ChatDialog/UserThumbnail/UserThumbnail'

export const ChatMemberProfile = () => {
  const [memberInfo, setMemberInfo] = useState(null)
  // const selectedUser = useAppSelector(setChatUser)
  // const { _id: memberId } = selectedUser

  // useEffect(() => {
  //   const getMemberInfo = async () => {
  //     try {
  //       const res = await getOneUser(memberId)
  //       if (res) {
  //         setMemberInfo(res)
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   getMemberInfo()
  // }, [memberId])

  return (
    memberInfo && (
      <div className='member-profile-container'>
        <MemberHeaderInfo memberInfo={memberInfo} />
        <MemberBio memberInfo={memberInfo} />
        <MemberSocials memberInfo={memberInfo} />
      </div>
    )
  )
}

const MemberHeaderInfo = ({ memberInfo }) => {
  return (
    <div className='member-grid'>
      {/* <MemberThumbnail user={memberInfo} /> */}
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
  const { portfolioUrl, githubUrl, linkedinUrl } = links || {}

  return (
    <div className='links-container'>
      <div className='links-container grid'>
        <HiLink />
        <div>
          <p>Portfolio</p>
          {portfolioUrl && (
            <a href={portfolioUrl} target='_blank' rel='noreferrer'>
              {portfolioUrl}
            </a>
          )}
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
          {linkedinUrl && (
            <a href={linkedinUrl} target='_blank' rel='noreferrer'>
              {linkedinUrl}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
