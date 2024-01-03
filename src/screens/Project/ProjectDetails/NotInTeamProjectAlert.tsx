import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectByUser } from 'utils/api'
import { AlertBanners } from 'interfaces/AccountSettingsInterface'
import { GoAlert } from 'react-icons/go'
import './NotInTeamProjectAlert.scss'

export const NotInTeamProjectAlert = () => {
  const [alertBanner, setAlertBanner] = useState<AlertBanners>({
    status: false,
    text: '',
    type: '',
  })
  const { projectId } = useParams<{ projectId: string }>()

  useEffect(() => {
    const getProjectMembers = async () => {
      try {
        const response = await getProjectByUser(projectId)
        if (response.existingProject.length === 0) {
          const messageWithBreaks = response.message.replace(/\n/g, '<br />')
          const surveyLink = `<a href="${response.surveyURL}" target="_blank" rel="noopener noreferrer">take this short survey</a> so we can improve.`
          const textWithSurveyLink = messageWithBreaks + ' ' + surveyLink
          setAlertBanner({
            status: true,
            text: textWithSurveyLink,
            icon: <GoAlert />,
            type: 'warning',
          })
        }
      } catch (error) {
        console.error('Error fetching project members:', error)
      }
    }
    getProjectMembers()
  }, [])

  return (
    <>
      {alertBanner.status ? (
        <div className='not-in-team-alert'>
          <div className={`nita-${alertBanner.type}`}>
            {alertBanner.icon}
            <div dangerouslySetInnerHTML={{ __html: alertBanner.text }} />
          </div>
        </div>
      ) : null}
    </>
  )
}
