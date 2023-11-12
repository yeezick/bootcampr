import { useEffect, useState } from 'react'
import {
  getEmailPreferenceOptions,
  getUserEmailPreferences,
} from '../../utils/api/communications.js'
import './EmailPreferences.scss'
import { Checkbox, Switch } from '@mui/material'
import { PrimaryButton } from 'components/Buttons'
import { useAppSelector } from 'utils/redux/hooks'
import { selectUserId } from 'utils/redux/slices/userSlice'

export default function EmailPreferences() {
  const [emailPreferenceOptions, setEmailPreferenceOptions] = useState({})
  const [disableAll, toggleDisableAll] = useState(false)
  const [userPreferences, setUserPreferences] = useState({
    bootcamprUpdates: true,
    newsletters: true,
    projectUpdates: true,
    eventInvitations: true,
    surveysAndFeedback: true,
    chatNotifications: true,
    jobAlerts: true,
  })
  const userId = useAppSelector(selectUserId)

  useEffect(() => {
    const getOptions = async () => {
      const options = await getEmailPreferenceOptions()
      setEmailPreferenceOptions(options)
    }
    getOptions()

    const getUserPreferences = async () => {
      const preferences = await getUserEmailPreferences(userId)
      setUserPreferences(preferences)
    }
    getUserPreferences()
  }, [userId])

  const handleUnsubscribeSwitch = () => {
    toggleDisableAll(!disableAll)
  }

  const handleChecks = (e, option) => {
    setUserPreferences({
      ...userPreferences,
      [option]: !userPreferences[option],
    })
  }

  return (
    <div className='email-preferences-screen'>
      <div className='email-preferences-container'>
        <h1 className='email-preferences-header'>Email preferences</h1>
        <h3 className='email-preferences-sub-header'>
          Select the types of email you would like to receive from Bootcampr.
        </h3>
        <div className='email-preference-options'>
          {Object.keys(emailPreferenceOptions).length &&
            Object.keys(emailPreferenceOptions).map(option => (
              // Make component for each option
              <div className='email-preference-option' key={option}>
                <Checkbox
                  name={option}
                  checked={userPreferences[option]}
                  disabled={disableAll}
                  onChange={e => handleChecks(e, option)}
                  className='email-preference-option-checkbox'
                />
                <div
                  className={`email-preference-option-text ${
                    disableAll && 'disabled'
                  }`}
                >
                  <h4>{emailPreferenceOptions[option]?.title}</h4>
                  <p>{emailPreferenceOptions[option]?.description}</p>
                </div>
              </div>
            ))}
        </div>
        <div className='unsubscribe-all-banner'>
          <div className='unsubscribe-all-banner-text'>
            <h4>Unsubscribe from all emails.</h4>
            <p>We'll still send account access emails.</p>
          </div>
          <Switch checked={disableAll} onChange={handleUnsubscribeSwitch} />
        </div>
        <div className='email-preferences-submit'>
          <PrimaryButton
            handler={() => console.log('save preferences')}
            paginatorBtn={false}
            text={'Save preferences'}
          />
        </div>
      </div>
    </div>
  )
}
