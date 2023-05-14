import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

//todo: complete copy-paste from MUI, revisit!!!!
function TabPanel(props) {
  const { activeTab, children, index } = props

  return (
    <div
      role='tabpanel'
      hidden={activeTab !== index}
      key={`calendar-tab-${index}`}
    >
      {activeTab === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export const CalendarTabs = () => {
  const [activeTab, setActiveTab] = React.useState(0)

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const allTabs = [
    {
      label: 'Calendar',
      component: <>Calendar</>,
    },
    {
      label: 'Availability',
      component: <>Availability</>,
    },
  ]

  return (
    <Box sx={{ width: '100%' }} className='calendar-body'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleChange}>
          {allTabs.map(tab => (
            <Tab label={tab.label} />
          ))}
        </Tabs>
      </Box>
      {allTabs.map((tab, index) => (
        <TabPanel activeTab={activeTab} index={index}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  )
}
