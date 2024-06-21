export const DisplayTimeAndSummary = ({ displayedFields, summary }) => {
  const { date, end, start } = displayedFields

  return (
    <div className='header-content modal-section'>
      <h3>{summary}</h3>
      <p>
        {date}, {start} - {end}
      </p>
    </div>
  )
}
