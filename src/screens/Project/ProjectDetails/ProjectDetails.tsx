import { useEffect, useState } from 'react'
import { WaitlistBanner } from './WaitlistBanner'
import { Overview } from './Overview'
import { ProjectTimeline } from './ProjectTimeline'
import { Presentation } from './Presentation'
import './ProjectDetails.scss'

export const ProjectDetails = () => {
  const tabData = [
    { label: 'PROJECT BRIEF', content: <Overview /> },
    { label: 'TIMELINE', content: <ProjectTimeline /> },
    { label: 'PRESENTATION', content: <Presentation /> },
  ]

  return (
    <div className='project-details-portal'>
      <div className='pd-cont'>
        <div className='pd-header-cont'>
          <WaitlistBanner />
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
    const buttonWidth = document.getElementById(`tab-${tabIndex}`)?.offsetWidth
    const buttonLeft = document.getElementById(`tab-${tabIndex}`)?.offsetLeft

    setIndicatorWidth(buttonWidth)
    setIndicatorLeft(buttonLeft)
  }

  useEffect(() => {
    const buttonWidth = document.getElementById(`tab-${activeTab}`)?.offsetWidth
    setIndicatorWidth(buttonWidth)
  }, [activeTab])

  return (
    <div className='pd-nav-cont'>
      <div className='pd-nav-tabs-btns'>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            id={`tab-${index}`}
            tabIndex={index}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            tabName={tab.label}
          />
        ))}
        <span
          className='pd-nav-indicator'
          style={{
            width: `${indicatorWidth}px`,
            transform: `translateX(${indicatorLeft}px)`,
          }}
        />
      </div>
      <div className='pd-nav-content-cont'>{tabs[activeTab].content}</div>
    </div>
  )
}

const TabButton = ({ id, activeTab, tabIndex, handleTabClick, tabName }) => {
  const isActive = activeTab === tabIndex

  const handleClick = () => {
    handleTabClick(tabIndex)
  }

  const tabClass = isActive ? 'pd-nav-tabs-active' : 'pd-nav-tabs'

  return (
    <button id={id} className={tabClass} onClick={handleClick}>
      <h1>{tabName}</h1>
    </button>
  )
}
