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
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box>
          <TabList
            sx={{ ...tabListStyles }}
            onChange={handleChange}
            aria-label='Product Details navigation'
          >
            {/* {tabData.map((tab, idx) => (
              <CustomTab label={tab.label} value={`${idx} + 1`} />
            ))} */}
            <Tab label='PROJECT BRIEF' value='1' sx={tabStyles} {...tabProps} />
            <Tab label='TIMELINE' value='2' sx={tabStyles} {...tabProps} />
            <Tab label='PRESENTATION' value='3' sx={tabStyles} {...tabProps} />
          </TabList>
        </Box>
        <TabPanel value='1' sx={{ marginLeft: '10px' }}>
          <Overview />
        </TabPanel>
        <TabPanel value='2' sx={{ marginLeft: '10px' }}>
          <ProjectTimeline />
        </TabPanel>
        <TabPanel value='3' sx={{ marginLeft: '10px' }}>
          <Presentation />
        </TabPanel>
      </TabContext>
    </Box>
  )
}

// const CustomTab = ({ label, value }) => {
//   return <Tab label={label} value={value} />
// }
const tabListStyles = {
  background: '#fff',
  marginLeft: '32px',
  marginBottom: '-40px',
  marginTop: '16px',
  paddingBottom: '16px',
  '& .MuiTabs-indicator': {
    backgroundColor: '#ffa726',
    height: '4px',
  },
  '& .MuiTab-root': {
    minWidth: 'auto',
    marginRight: '16px',
    color: 'black',
    '&.Mui-selected': {
      color: 'black',
    },
  },
}
const tabStyles = {
  border: '1px solid violet',
  padding: '0',
  fontSize: '16px',
  fontWeight: '600',
}
const tabProps = {
  disableRipple: true,
  disableFocusRipple: true,
}
