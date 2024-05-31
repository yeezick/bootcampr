import { useState } from 'react'
import { Overview } from './Overview'
import { ProjectTimeline } from './ProjectTimeline'
import { Presentation } from './Presentation'
import './ProjectDetails.scss'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { PresentationInfoBanner } from './PresentationInfoBanner'
import { useAppSelector } from 'utils/redux/hooks'
import { selectCompletedInfo } from 'utils/redux/slices/projectSlice'

export const ProjectDetails = () => {
  const projectSubmissionInfo = useAppSelector(selectCompletedInfo)
  const isProjectSubmitted = projectSubmissionInfo.presenting !== null
  const tabData = [
    { label: 'PROJECT BRIEF', content: <Overview /> },
    { label: 'TIMELINE', content: <ProjectTimeline /> },
    { label: 'PRESENTATION', content: <Presentation /> },
  ]

  const [value, setValue] = useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const tabPanelStyles = isProjectSubmitted ? 'with-banner' : 'tab-panel'

  return (
    <Box className='project-details-content'>
      <>{isProjectCompleted && <ProjectComplationBanner />} </>
      <TabContext value={value}>
        <Box className='banner-and-tab-list'>
          {isProjectSubmitted && <PresentationInfoBanner />}
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
