import { useState } from 'react'
import { Overview } from './Overview'
import { ProjectTimeline } from './ProjectTimeline'
import { Presentation } from './Presentation'
import './ProjectDetails.scss'
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

export const ProjectDetails = () => {
  const tabData = [
    { label: 'PROJECT BRIEF', content: <Overview /> },
    { label: 'TIMELINE', content: <ProjectTimeline /> },
    { label: 'PRESENTATION', content: <Presentation /> },
  ]

  const [value, setValue] = useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box className='project-details-content'>
      <TabContext value={value}>
        <Box>
          <TabList
            className='tab-list'
            onChange={handleChange}
            aria-label='Product Details navigation'
          >
            {/* {tabData.map((tab, idx) => (
              <CustomTab
                key={`tab-${idx + 1}`}
                label={tab.label}
                value={(idx + 1).toString()}
              />
            ))} */}
            <Tab
              label='PROJECT BRIEF'
              value='1'
              className='tab'
              {...tabProps}
            />
            <Tab label='TIMELINE' value='2' className='tab' {...tabProps} />
            <Tab label='PRESENTATION' value='3' className='tab' {...tabProps} />
          </TabList>
        </Box>
        {tabData.map((tab, idx) => (
          <CustomTabPanel
            key={`tab-panel-${idx + 1}`}
            value={(idx + 1).toString()}
          >
            {tab.content}
          </CustomTabPanel>
        ))}
      </TabContext>
    </Box>
  )
}

const CustomTab = ({ label, value }) => {
  return <Tab label={label} value={value} className='tab' {...tabProps} />
}

const CustomTabPanel = ({ value, children }) => {
  return (
    <TabPanel value={value} sx={{ marginLeft: '10px' }}>
      {children}
    </TabPanel>
  )
}

const tabProps = {
  disableRipple: true,
  disableFocusRipple: true,
}
