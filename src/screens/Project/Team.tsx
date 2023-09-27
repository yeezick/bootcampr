import './Team.scss'
import TeamBanner from '../../assets/Images/team-banner.png'

export const Team = () => {
  return (
    <>
      <div className='team-container'>
        <div className='page-container'>
          <div className='header-container'>
            <img src={TeamBanner} alt='man working on computer'></img>
          </div>
          <div className='banner-box-container'>
            <div className='banner-text-container'>
              <div className='banner-text'>
                <h1>Team Members</h1>
              </div>
            </div>
          </div>
          <div className='software-engineer-container'>
            <div className='swe-text-container'></div>
            <h1>Software Engineers</h1>
          </div>
        </div>
      </div>
    </>
  )
}
