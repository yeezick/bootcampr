import './SetUpProfile.scss'
import { useEffect, useState } from 'react'
import { selectAuthUser } from 'utils/redux/slices/userSlice'
import { emptyUser } from 'utils/data/userConstants'
import { UserInterface } from 'interfaces/UserInterface'
import Avatar from 'components/Avatar/Avatar'
import { useAppSelector } from 'utils/redux/hooks'
import { validGithubUrl, validLinkedinUrl } from 'utils/components/Inputs'
import { isEmptyString } from 'utils/helpers/inputUtils'
import { SetupProfileBtns } from '../../components/UserProfile/components/SetupProfileBtns'
import { ProfileInputs } from 'components/UserProfile/components/ProfileInputs'
import { handleUserProfileInputChange } from 'utils/helpers'

export const determineDisabledbtn = (updateUserForm, setDisabledBtn) => {
  const { firstName, lastName, bio, links, role } = updateUserForm
  const validForm = firstName && lastName && bio && links.linkedinUrl

  if (validForm && validLinkedinUrl(links.linkedinUrl)) {
    if (role === 'Software Engineer' && !validGithubUrl(links.githubUrl)) {
      setDisabledBtn(true)
      return
    }
    setDisabledBtn(false)
  } else {
    setDisabledBtn(true)
  }
}

// BC-787: remove BEM styling
export const SetUpProfile = ({ handlePageNavigation }) => {
  const authUser = useAppSelector(selectAuthUser)
  const [updateUserForm, setUpdateUserForm] = useState<UserInterface>(emptyUser)
  const [errorStates, setErrorStates] = useState({
    firstName: false,
    lastName: false,
    bio: false,
    linkedinUrl: false,
    githubUrl: false,
  })
  const [disabledBtn, setDisabledBtn] = useState(true)

  useEffect(() => {
    if (authUser) {
      setUpdateUserForm(currForm => {
        return { ...currForm, ...authUser }
      })
    }
  }, [authUser])

  useEffect(() => {
    determineDisabledbtn(updateUserForm, setDisabledBtn)
  }, [updateUserForm])

  const handleInputChange = e =>
    handleUserProfileInputChange(e, setUpdateUserForm, setErrorStates)

  return (
    <div className='setupProfile'>
      <div className='setupProfile__profile-header-cont'>
        <h2>Profile</h2>
        <p>Set up your profile so your team can get to know you.</p>
        <p>You can edit your profile later by going to My Account.</p>
        <i>*Required fields</i>
      </div>
      <div className='setupProfile__profile-container'>
        <form
          onSubmit={e => handlePageNavigation(e, 'next')}
          className='setupProfile__profile-form'
        >
          <div className='setupProfile__inputs-container'>
            <div className='setupProfile__profile-image'>
              <Avatar
                addPhotoIconId='imageChange'
                clickable={false}
                hasIcon={true}
                iconButtonClassName='setupProfile__cameraIcon'
              />
            </div>
            <ProfileInputs
              errorStates={errorStates}
              handleInputChange={handleInputChange}
              updateUserForm={updateUserForm}
            />
          </div>
          <SetupProfileBtns
            disabledBtn={disabledBtn}
            handlePageNavigation={handlePageNavigation}
            updateUserForm={updateUserForm}
          />
        </form>
      </div>
    </div>
  )
}
