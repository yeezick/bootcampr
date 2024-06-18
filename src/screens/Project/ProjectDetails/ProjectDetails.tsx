import { useEffect, useState } from 'react'
import { Overview } from './Overview'
import { ProjectTimeline } from './ProjectTimeline'
import { Presentation } from './Presentation'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { PresentationInfoBanner } from './PresentationInfoBanner'
import { useAppSelector } from 'utils/redux/hooks'
import {
  selectCompletedInfo,
  selectPresentationDateWithTime,
  selectProjectCompleted,
  selectProjectId,
} from 'utils/redux/slices/projectSlice'
import {
  selectAuthUser,
  selectIsActiveUser,
  selectIsInactiveUser,
  selectIsRecurringUnpaidUser,
} from 'utils/redux/slices/userSlice'
import { blankDayJs } from 'utils/helpers'
import { ProjectCompletionBanner } from 'screens/ProjectCompletion/ProjectCompletionBanner'
import { SubmittedProject } from './SubmittedProject'
import './ProjectDetails.scss'

export const ProjectDetails = () => {
  const [value, setValue] = useState('1')
  const { presenting } = useAppSelector(selectCompletedInfo)
  const currentProjectId = useAppSelector(selectProjectId)
  const projectCompleted = useAppSelector(selectProjectCompleted)
  const isInactiveUser = useAppSelector(selectIsInactiveUser)
  const isActiveUser = useAppSelector(selectIsActiveUser)
  const isRecurringUnpaidUser = useAppSelector(selectIsRecurringUnpaidUser)
  const isProjectSubmitted = presenting !== null
  const authUser = useAppSelector(selectAuthUser)
  const presentationTab = { label: 'PRESENTATION', content: <Presentation /> }
  const submittedProjectTab = {
    label: 'SUBMITTED PROJECT',
    content: <SubmittedProject />,
  }
  const projectInfoTab = projectCompleted
    ? submittedProjectTab
    : presentationTab

  const tabData = [
    { label: 'PROJECT BRIEF', content: <Overview /> },
    { label: 'TIMELINE', content: <ProjectTimeline /> },
    { ...projectInfoTab },
  ]

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const projectSubmittedNotPresented = isProjectSubmitted && !projectCompleted
  const tabPanelStyles = projectSubmittedNotPresented
    ? 'with-banner'
    : 'tab-panel'

  const displaysCurrentProjectInfo =
    currentProjectId === authUser.projects.activeProject

  return (
    <Box className='project-details-content'>
      <>
        {(isInactiveUser ||
          isRecurringUnpaidUser ||
          (isActiveUser &&
            projectSubmittedNotPresented &&
            displaysCurrentProjectInfo)) && <ProjectCompletionBanner />}{' '}
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
