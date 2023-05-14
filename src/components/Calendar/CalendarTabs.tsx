import { useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import { Availability } from 'components/Availability/Availability'

// If components need props, create this object inside CalendarTabs instead
const allTabs = [
  {
    label: 'Calendar',
    component: <>Calendar</>,
  },
  {
    label: 'My Availability',
    component: <Availability />,
  },
]

//todo: complete copy-paste from MUI, revisit!!!!
const TabContent = props => {
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
  const [activeTab, setActiveTab] = useState(0)

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
  }

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
        <TabContent activeTab={activeTab} index={index}>
          {tab.component}
        </TabContent>
      ))}
    </Box>
  )
}
