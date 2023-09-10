import React from 'react'

export const Two = ({ backgroundColor, handlePageNavigation }) => {
  return (
    <div style={{ backgroundColor }}>
      <h1>TWO</h1>
      <button onClick={() => handlePageNavigation('previous')}>Previous</button>
      <button onClick={() => handlePageNavigation('next')}>Next</button>
    </div>
  )
}
