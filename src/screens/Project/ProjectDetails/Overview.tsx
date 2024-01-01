import './Overview.scss'

export const Overview = () => {
  return (
    <div className='overview'>
      <div className='ov-text-cont'>
        <div className='ov-header-cont'>
          <h1> Brief Overview </h1>
        </div>
        <div className='ov-info-cont'>
          <div className='ov-sub-info'>
            <b>Project:</b>
            <p>Design and ship a responsive website.</p>
            <br />
          </div>
          <div className='ov-sub-info'>
            <b>Problem:</b>
            <p>
              How might we connect people with similar travel plans/ interests?
            </p>
            <br />
          </div>
          <div className='ov-sub-info'>
            <b>Consider:</b>
            <p>Solo travelers</p>
            <p>Commuters</p>
            <p>Road trippers</p>
            <p>etc.</p>
            <br />
          </div>
          <div className='ov-sub-info'>
            <b>Deliverables:</b>
            <p>UXD: High-fidelity prototype to handoff to developers</p>
            <p>SWE: Deployed full-stack website</p>
            <br />
          </div>
          <div className='ov-sub-info'>
            <b>Scope:</b>
            <p>4 weeks</p>
            <p>Submit Minimum Viable Product Website</p>
          </div>
        </div>
      </div>
    </div>
  )
}
