import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'utils/redux/hooks'
import { selectAuthUser, setAuthUser } from 'utils/redux/slices/userSlice'
import { emptyUser } from 'utils/data/userConstants'
import { updateUser } from 'utils/api/users'
import { Avatar } from 'components/Avatar/Avatar'
import './EditProfile.scss'
import { errorSnackbar, successSnackbar } from 'utils/helpers/commentHelpers'
import { ProfileInputs } from 'components/UserProfile/components/ProfileInputs'
import { determineDisabledbtn } from 'screens/Onboarding/SetUpProfile'
import { handleUserProfileInputChange } from 'utils/helpers'
import { PrimaryButton } from 'components/Buttons'

export const EditProfile: React.FC = () => {
  const authUser = useSelector(selectAuthUser)
  const [updateUserForm, setUpdateUserForm] = useState(emptyUser)
  const [disabledBtn, setDisabledBtn] = useState(true)
  const [errorStates, setErrorStates] = useState({
    firstName: false,
    lastName: false,
    bio: false,
    linkedinUrl: false,
    githubUrl: false,
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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

  const handleUserUpdate = async (e: React.FormEvent) => {
    setIsLoading(true)
    e.preventDefault()

    try {
      const updatedUser = await updateUser(authUser._id, updateUserForm)
      dispatch(setAuthUser(updatedUser))
      dispatch(successSnackbar('Profile saved!'))
      navigate(`/users/${authUser._id}`)
      setIsLoading(false)
    } catch (error) {
      console.log('Error occurred when trying to update User Profile', error)
      dispatch(
        errorSnackbar('Failed to update user profile. Please try again.')
      )
      setIsLoading(false)
    }
  }

  if (!authUser) {
    return <div>Loading user...</div>
  }

  return (
    <div className='editprofile'>
      <div className='editprofile__container'>
        <form className='editprofile__form'>
          <div className='editprofile__imageContainer'>
            <div className='editprofile__image'>
              <Avatar
                addPhotoIconId='imageChange'
                clickable={false}
                hasIcon={true}
                iconButtonClassName='editprofile__cameraIcon'
              />
            </div>
            <PrimaryButton
              onClick={handleUserUpdate}
              loading={isLoading}
              disabled={disabledBtn}
              label='Save Profile'
              style={{ position: 'absolute', top: '0', right: '0' }}
            />
          </div>
          <div className='editprofile__labelContainer'>
            <ProfileInputs
              errorStates={errorStates}
              handleInputChange={handleInputChange}
              updateUserForm={updateUserForm}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
