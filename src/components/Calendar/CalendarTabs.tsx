import { useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import { CalendarView } from 'screens/Calendar/CalendarView'
import { EditAvailability } from 'screens/Calendar/EditAvailability'

type AllTabsInterface = {
  label: string
  component: () => JSX.Element
  props?: any
}[]

export const CalendarTabs = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const allTabs: AllTabsInterface = [
    {
      label: 'Calendar',
      component: CalendarView,
    },
    {
      label: 'My Availability',
      component: EditAvailability,
    },
  ]

  return (
    <Box className='calendar-body'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          {allTabs.map(tab => (
            <Tab label={tab.label} key={`tab-label-${tab.label}`} />
          ))}
        </Tabs>
      </Box>
      {allTabs.map((tab, index) => (
        <TabContent
          activeTab={activeTab}
          key={`tab-body-${index}`}
          index={index}
        >
          <tab.component {...tab.props} />
        </TabContent>
      ))}
    </Box>
  )
}

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
