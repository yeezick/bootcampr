import { useState, useReducer } from 'react'
import axios from 'axios'
import React from 'react'

const initialState = {
  error: null,
  greeting: null,
}

const greetingReducer = (state, action) => {
  switch (action.type) {
    case 'success': {
      return {
        error: null,
        greeting: action.greeting,
      }
    }
    case 'error': {
      return {
        error: action.error,
        greeting: null,
      }
    }
    default: {
      return state
    }
  }
}

export const Fetch = ({ url }) => {
  const [{ error, greeting }, dispatch] = useReducer(
    greetingReducer,
    initialState
  )
  const [buttonClicked, setButtonClicked] = useState(false)

  const fetchGreeting = async url =>
    axios
      .get(url)
      .then(response => {
        const { data } = response
        const { greeting } = data
        dispatch({ type: 'SUCCESS', greeting })
        setButtonClicked(true)
      })
      .catch(error => {
        dispatch({ type: 'ERROR', error })
      })

  const buttonText = buttonClicked ? 'Ok' : 'Load greeting'
  return (
    <div>
      <button onClick={() => fetchGreeting(url)} disabled={buttonClicked}>
        {buttonText}
      </button>
      {greeting && <h1>{greeting}</h1>}
      {error && <p role='alert'>Oops, failed to fetch!</p>}
    </div>
  )
}
