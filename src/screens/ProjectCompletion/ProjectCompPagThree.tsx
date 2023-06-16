export const ProjectCompPagThree = ({
  backgroundColor,
  handlePageNavigation,
}) => {
  return (
    <div style={{ backgroundColor }}>
      <h1>Three</h1>
      <button onClick={() => handlePageNavigation('next')}>Next</button>
    </div>
  )
}
