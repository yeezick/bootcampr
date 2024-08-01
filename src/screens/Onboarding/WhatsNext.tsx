import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectAuthUser,
  selectIsRecurringUser,
  updateAuthUser,
  updateUserExperience,
  updateUserProject,
} from 'utils/redux/slices/userSlice'
import { fetchAndStoreUserProject } from 'utils/redux/slices/projectSlice'
import {
  removeActiveProject,
  updatePaymentExperience,
  updateUserProfile,
  verifyPayment,
} from 'utils/api'
import { errorSnackbar } from 'utils/helpers/commentHelpers'
import { PrimaryButton } from 'components/Buttons'
import './WhatsNext.scss'
import { Loader } from 'components/Loader/Loader'

export const WhatsNext = () => {
  const authUser = useAppSelector(selectAuthUser)
  const [isLoading, setIsLoading] = useState(false)
  const [isUserUpdated, setIsUserUpdated] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isRecurringUser = useAppSelector(selectIsRecurringUser)
  const bannerHeader = isRecurringUser
    ? "You're ready for your next project!"
    : "You're ready to Collabify!"

  useEffect(() => {
    const checkUserPayment = async () => {
      const checkoutSessionId = searchParams.get('checkout_session_id')
      const res = await verifyPayment(checkoutSessionId)
      if (!res.valid) {
        navigate('/contact-us')
        dispatch(
          errorSnackbar(
            'There was a problem verifying your payment. Please reach out to us to resolve your issue!'
          )
        )
        return
      }

      if (!authUser.payment.paid) {
        let updatedUserExperience
        if (!authUser.projects.projects.length) {
          updatedUserExperience = await updatePaymentExperience(authUser._id, {
            experience: 'waitlist',
            paid: true,
          })

          dispatch(updateUserProject('sandbox'))
          await dispatch(fetchAndStoreUserProject('sandbox'))
        } else {
          updatedUserExperience = await updatePaymentExperience(authUser._id, {
            experience: 'recurring',
            paid: true,
          })
          await removeActiveProject(authUser._id)
          dispatch(updateUserProject(''))
          await dispatch(fetchAndStoreUserProject('waitlist')).unwrap()
        }

        const updatedUserProfile = await updateUserProfile({ onboarded: true })
        if (updatedUserExperience.error) {
          dispatch(errorSnackbar('Error updating project experience.'))
          return
        } else if (updatedUserProfile.error) {
          dispatch(errorSnackbar('Error updating user as onboarded.'))
          return
        } else {
          dispatch(updateUserExperience(updatedUserExperience))
          dispatch(updateAuthUser({ onboarded: true }))
        }
        setIsUserUpdated(true)
      }
    }
    if (authUser._id) {
      setIsLoading(true)
      checkUserPayment()
      setIsLoading(false)
    }
  }, [authUser])

  if (isLoading || !isUserUpdated) {
    return <Loader />
  }

  const handleViewProjectDetails = () => {
    // If user is not yet assigned a project, route them to the generic Product Details page
    const projectSlug = authUser.projects.activeProject
      ? authUser.projects.activeProject
      : 'waitlist'
    navigate(`/project/${projectSlug}`)
  }

  return (
    <div className='onboarding-lastscreen-container'>
      <div className='lastscreen-text-container'>
        <div className='lastscreen-header'>
          <h1>{bannerHeader}</h1>
        </div>
        <div className='whats-next'>
          <h2> What's next?</h2>
          <p>
            Collabify is now working to match you to a team. After your team of
            3 SWEs and 2 UXDs, and 1 PM is complete, we'll send an email with
            the date and time of your project kickoff meeting. (Approximately 1
            - 2 weeks from today)
          </p>
        </div>
        <div className='lastscreen-survey'>
          <p className='lastscreen-feedback'>
            We love feedback. Please take&ensp;
            <span>
              <a
                href='https://forms.gle/vfdAQpNMv2tZBwBB6'
                target='_blank'
                rel='noreferrer'
              >
                this short survey
              </a>
            </span>
            &ensp;so we can improve.
          </p>
          <p>Your answers will be kept confidential. Thank you!</p>
        </div>
        <div className='project-details'>
          <p>You can view the product details at any time.</p>
          <PrimaryButton
            label='View product details'
            onClick={handleViewProjectDetails}
          />
        </div>
      </div>
    </div>
  )
}
