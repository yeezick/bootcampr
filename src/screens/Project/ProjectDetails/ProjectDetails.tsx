import { useEffect, useState } from 'react'
import { Overview } from './Overview'
import { ProjectTimeline } from './ProjectTimeline'
import { Presentation } from './Presentation'
import './ProjectDetails.scss'

export const ProjectDetails = () => {
  const tabData = [
    { label: 'OVERVIEW', content: <Overview /> },
    { label: 'TIMELINE', content: <ProjectTimeline /> },
    { label: 'PRESENTATION', content: <Presentation /> },
  ]

  return (
    <div className='project_details'>
      <div className='pd_cont'>
        <div className='pd_header_cont'>
          <div className='pd_header'>
            <h1>Project Details</h1>
          </div>
          <RenderTab tabs={tabData} />
        </div>
      </div>
    </div>
  )
}

const RenderTab = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [indicatorWidth, setIndicatorWidth] = useState(0)
  const [indicatorLeft, setIndicatorLeft] = useState(0)

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex)
    const buttonWidth = document.getElementById(`tab_${tabIndex}`)?.offsetWidth
    const buttonLeft = document.getElementById(`tab_${tabIndex}`)?.offsetLeft

    setIndicatorWidth(buttonWidth)
    setIndicatorLeft(buttonLeft)
  }

  useEffect(() => {
    const buttonWidth = document.getElementById(`tab_${activeTab}`)?.offsetWidth
    setIndicatorWidth(buttonWidth)
  }, [activeTab])

  return (
    <div className='pd_nav_cont'>
      <div className='pd_nav_tabs_btns'>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            id={`tab_${index}`}
            tabIndex={index}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            tabName={tab.label}
          />
        ))}
        <span
          className='pd_nav_indicator'
          style={{
            width: `${indicatorWidth}px`,
            transform: `translateX(${indicatorLeft}px)`,
          }}
        />
      </div>
      <div className='pd_nav_content_cont'>{tabs[activeTab].content}</div>
    </div>
  )
}

const TabButton = ({ id, activeTab, tabIndex, handleTabClick, tabName }) => {
  const isActive = activeTab === tabIndex

  const handleClick = () => {
    handleTabClick(tabIndex)
  }

  const tabClass = isActive ? 'pd_nav_tabs_active' : 'pd_nav_tabs'

  return (
    <button id={id} className={tabClass} onClick={handleClick}>
      <h1>{tabName}</h1>
    </button>
  )
}
