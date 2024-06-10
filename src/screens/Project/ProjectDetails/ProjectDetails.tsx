import { useEffect, useState } from 'react'
import { Overview } from './Overview'
import { ProjectTimeline } from './ProjectTimeline'
import { Presentation } from './Presentation'
import './ProjectDetails.scss'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { PresentationInfoBanner } from './PresentationInfoBanner'
import { useAppDispatch, useAppSelector } from 'utils/redux/hooks'
import {
  selectCompletedInfo,
  selectPresentationDate,
  selectProjectId,
  selectProjectPresented,
  setProjectPresented,
} from 'utils/redux/slices/projectSlice'
import {
  selectIsRecurringUnpaidUser,
  selectUserPayment,
} from 'utils/redux/slices/userSlice'
import { isPaidActiveExperience } from 'utils/helpers/taskHelpers'
import { ProjectCompletionBanner } from 'screens/ProjectCompletion/ProjectCompletionBanner'
import { blankDayJs } from 'utils/helpers'
import { SubmittedProject } from './SubmittedProject'

export const ProjectDetails = () => {
  const dispatch = useAppDispatch()
  const projectPresented = useAppSelector(selectProjectPresented)
  const { presenting } = useAppSelector(selectCompletedInfo)
  const { endDateEST } = useAppSelector(selectPresentationDate)
  const userExperience = useAppSelector(selectUserPayment)
  const currentProjectId = useAppSelector(selectProjectId)
  const isActiveUser = isPaidActiveExperience(userExperience)
  const isRecurringUnpaidUser = useAppSelector(selectIsRecurringUnpaidUser)
  const isProjectSubmitted = presenting !== null
  const presentationTab = { label: 'PRESENTATION', content: <Presentation /> }
  const submittedProjectTab = {
    label: 'SUBMITTED PROJECT',
    content: <SubmittedProject />,
  }
  const projectInfoTab = projectPresented
    ? submittedProjectTab
    : presentationTab

  useEffect(() => {
    const now = blankDayJs()
    //Maybe we can move this to the selector
    if (now.isAfter(endDateEST, 'hour') && currentProjectId !== 'waitlist') {
      dispatch(
        setProjectPresented({ projectId: currentProjectId, isPresented: true })
      )
    }
  }, [currentProjectId])

  const tabData = [
    { label: 'PROJECT BRIEF', content: <Overview /> },
    { label: 'TIMELINE', content: <ProjectTimeline /> },
    { ...projectInfoTab },
  ]

  const [value, setValue] = useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const projectSubmittedNotPresented = isProjectSubmitted && !projectPresented
  const tabPanelStyles = projectSubmittedNotPresented
    ? 'with-banner'
    : 'tab-panel'

  return (
    <Box className='project-details-content'>
      <>
        {projectSubmittedNotPresented &&
          (isActiveUser || isRecurringUnpaidUser) && (
            <ProjectCompletionBanner />
          )}{' '}
      </>
      <TabContext value={value}>
        <Box className='banner-and-tab-list'>
          {projectSubmittedNotPresented && <PresentationInfoBanner />}
          <TabList
            className='tab-list'
            onChange={handleChange}
            aria-label='Product Details navigation'
          >
            {tabData.map((tab, idx) => (
              <Tab
                key={`tab-${idx + 1}`}
                label={tab.label}
                value={(idx + 1).toString()}
                className='tab'
                disableRipple
              />
            ))}
          </TabList>
        </Box>
        {tabData.map((tab, idx) => (
          <TabPanel
            key={`tab-panel-${idx + 1}`}
            value={(idx + 1).toString()}
            className={tabPanelStyles}
          >
            {tab.content}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  )
}
