export const One = ({ backgroundColor, handlePageNavigation }) => {
  return (
    <div style={{ backgroundColor: backgroundColor }}>
      <h1>ONE</h1>
      <button onClick={() => handlePageNavigation('next')}>Next</button>
    </div>
  )
}
