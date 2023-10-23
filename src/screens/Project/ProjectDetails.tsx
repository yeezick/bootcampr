import './ProjectDetails.scss'
import { MdOutlineArticle } from 'react-icons/md'
import ProjectDetailsBanner from '../../assets/Images/project-details-banner.png'
import bootcamprIcon from '../../assets/Images/bootcamprIcon.png'

export const ProjectDetails = () => {
  return (
    <div className='project-details-container'>
      <div className='page-container'>
        <div className='header-container'>
          <img src={ProjectDetailsBanner} alt='bee' />
        </div>
        <div className='banner-box-container'>
          <div className='banner-text-container'>
            <div className='banner-img'>
              <img src={bootcamprIcon} alt='bootcampr-logo' />
            </div>
            <div className='banner-text'>
              <h1>Bootcampr</h1>
            </div>
          </div>
        </div>
        <div className='overview-box-container'>
          <div className='overview-text-container'>
            <div className='brief-overview-header-container'>
              <div className='header-icon'>
                <MdOutlineArticle />
              </div>
              <h1> Brief Overview </h1>
            </div>
            <div className='brief-overview-text-container'>
              <div className='project'>
                <b>Project:</b>
                <br></br>
                Design and ship a responsive website.
                <br></br>
              </div>
              <div className='problem'>
                <p>
                  <b>Problem:</b>
                  <br />
                  How might we connect people with similar travel plans/
                  interests?
                  <br />
                </p>
              </div>
              <div className='consider'>
                <b>Consider:</b>
                <ul>
                  <li>Solo travelers</li>
                  <li>Commuters</li>
                  <li>Road trippers</li>
                  <li>etc.</li>
                </ul>
              </div>
              <div className='deliverables'>
                <p>
                  <b>Deliverables:</b>
                  <br />
                  UXD: High-fidelity prototype to handoff to developers
                  <br />
                  SWE: Deployed full-stack website
                  <br />
                </p>
              </div>
              <div className='scope'>
                <p>
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
    </div>
  )
}
