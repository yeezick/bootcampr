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
      <Box sx={tabsSelectStyles}>
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

const tabsSelectStyles = {
  backgroundColor: 'white',
  color: 'black',
  margin: '-20px 0 0 -4px',
  padding: '16px',
  position: 'absolute',
  width: 'calc(100% - 320px)',
  zIndex: '2',
  '& .MuiTabs-scroller': {
    height: '40px',
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#ffa726',
    height: '4px',
    bottom: '0',
    position: 'absolute',
  },
  '& .MuiButtonBase-root.Mui-selected': {
    color: 'black',
  },
  '& .MuiButtonBase-root': {
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '24px',
    color: 'black',
    padding: '0px',
    margin: '0 5px',
    minWidth: '82px',
  },
}
