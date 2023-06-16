export const ProjectCompPagFour = ({
  backgroundColor,
  handlePageNavigation,
}) => {
  return (
    <div style={{ backgroundColor }}>
      <h1>Four</h1>
      <button onClick={() => handlePageNavigation('next')}>Next</button>
    </div>
  )
}
