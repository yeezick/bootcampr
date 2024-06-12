import { useState } from 'react'
import { Overview } from './Overview'
import { ProjectTimeline } from './ProjectTimeline'
import { Presentation } from './Presentation'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { PresentationInfoBanner } from './PresentationInfoBanner'
import { useAppSelector } from 'utils/redux/hooks'
import {
  selectCompletedInfo,
  selectProjectPresented,
} from 'utils/redux/slices/projectSlice'
import {
  selectIsRecurringUnpaidUser,
  selectUserPayment,
} from 'utils/redux/slices/userSlice'
import { isPaidActiveExperience } from 'utils/helpers/taskHelpers'
import { ProjectCompletionBanner } from 'screens/ProjectCompletion/ProjectCompletionBanner'
import { SubmittedProject } from './SubmittedProject'
import './ProjectDetails.scss'

export const ProjectDetails = () => {
  const projectPresented = useAppSelector(selectProjectPresented)
  const { presenting } = useAppSelector(selectCompletedInfo)
  const userExperience = useAppSelector(selectUserPayment)
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
