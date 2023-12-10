import './Overview.scss'

export const Overview = () => {
  return (
    <div className='overview'>
      <div className='ov_text_cont'>
        <div className='ov_header_cont'>
          <h1> Brief Overview </h1>
        </div>
        <div className='ov_info_cont'>
          <div className='ov_sub_info'>
            <b>Project:</b>
            <p>Design and ship a responsive website.</p>
            <br />
          </div>
          <div className='ov_sub_info'>
            <b>Problem:</b>
            <p>
              How might we connect people with similar travel plans/ interests?
            </p>
            <br />
          </div>
          <div className='ov_sub_info'>
            <b>Consider:</b>
            <p>Solo travelers</p>
            <p>Commuters</p>
            <p>Road trippers</p>
            <p>etc.</p>
            <br />
          </div>
          <div className='ov_sub_info'>
            <b>Deliverables:</b>
            <p>UXD: High-fidelity prototype to handoff to developers</p>
            <p>SWE: Deployed full-stack website</p>
            <br />
          </div>
          <div className='ov_sub_info'>
            <b>Scope:</b>
            <p>4 weeks</p>
            <p>Submit Minimum Viable Product Website</p>
          </div>
        </div>
      </div>
    </div>
  )
}
