import { ProjectDetailsSidebar } from './ProjectDetailsSidebar'
import './ProjectDetails.scss'
import ProjectDetailsBanner from '../../../assets/Image/project-details-banner.png'

//TODO: fix brief overview box,
//TODO: get images to work,

export const ProjectDetails = () => {
  return (
    <>
      <div className='project-details-container'>
        <ProjectDetailsSidebar />
        <div className='page-container'>
          <div className='header-container'>
            <img src={ProjectDetailsBanner} alt='bee'></img>
          </div>
          <div className='banner-box-container'>
            <div className='banner-text-container'>
              <div className='banner-img'>
                <img src='bootcamprB.png' alt='bootcampr-logo'></img>
              </div>
              <div className='banner-text'>
                <h1>Bootcampr</h1>
              </div>
            </div>
          </div>
          <div className='overview-box-container'>
            <div className='overview-text-container'>
              <div className='brief-overview-header-container'>
                <h1> Brief Overview </h1>
              </div>
              <div className='brief-overview-text-container'>
                <p>
                  <b>Project:</b>
                  <br></br>
                  Design and ship a responsive website.
                  <br />
                  <b>Problem:</b>
                  <br />
                  How might we connect people with similar travel plans/
                  interests?
                  <br />
                  <b>Consider:</b>
                  <br />
                  <b>Deliverables:</b>
                  <br />
                  UXD: High-fidelity prototype to handoff to developers
                  <br />
                  SWE: Deployed full-stack website
                  <br />
                  <b>Scope:</b>
                  <br />
                  4 weeks
                  <br />
                  Submit Minimum Viable Product Website
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
