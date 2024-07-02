import { useEffect, useRef, useState } from 'react'
import { Overview } from './Overview'
import { ProjectTimeline } from './ProjectTimeline'
import { Presentation } from './Presentation'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { PresentationInfoBanner } from './PresentationInfoBanner'
import { useAppSelector } from 'utils/redux/hooks'
import {
  selectCompletedInfo,
  selectProjectCompleted,
  selectProjectId,
} from 'utils/redux/slices/projectSlice'
import {
  selectAuthUser,
  selectIsActiveUser,
  selectIsInactiveUser,
  selectIsRecurringUnpaidUser,
} from 'utils/redux/slices/userSlice'
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
  const authUser = useAppSelector(selectAuthUser)
  const tabListAndBannerRef = useRef(null)
  const isProjectSubmitted = presenting !== null
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

  const projectSubmittedNotPresented = isProjectSubmitted && !projectCompleted

  const showProjectCompletionBanner =
    isInactiveUser ||
    isRecurringUnpaidUser ||
    (isActiveUser &&
      projectSubmittedNotPresented &&
      currentProjectId === authUser.projects.activeProject)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const setTabListAndBannerHeight = () => {
    if (tabListAndBannerRef.current) {
      const tabListAndBannerHeight = tabListAndBannerRef.current.offsetHeight
      document.documentElement.style.setProperty(
        '--tab-list-and-banner-height',
        `${tabListAndBannerHeight}px`
      )
    }
  }

  useEffect(() => {
    setTabListAndBannerHeight()
  }, [])

  return (
    <Box className='project-details-content'>
      <TabContext value={value}>
        <Box ref={tabListAndBannerRef}>
          {showProjectCompletionBanner && <ProjectCompletionBanner />}
          {projectSubmittedNotPresented && <PresentationInfoBanner />}
          <Box className='tab-list-container'>
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
        </Box>
        <Box className='tab-panels'>
          {tabData.map((tab, idx) => (
            <TabPanel
              key={`tab-panel-${idx + 1}`}
              value={(idx + 1).toString()}
              className='tab-panel'
            >
              {tab.content}
            </TabPanel>
          ))}
        </Box>
      </TabContext>
    </Box>
  )
}
