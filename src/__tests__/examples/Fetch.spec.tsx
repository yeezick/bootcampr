import * as React from 'react'
import { act, render, screen } from '../custom-render'
import userEvent from '@testing-library/user-event'
import { Fetch } from './Fetch'

test('Loads and displays greeting', async () => {
  // Arrange
  render(<Fetch url='/greeting/success' />)

  // Act
  await userEvent.click(screen.getByText(/load greeting/i))
  await act(() => screen.getByRole('heading'))

  // Assert
  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toBeDisabled()
})

test('Handles server error', async () => {
  // Arrange
  render(<Fetch url='/greeting/failure' />)

  // Act
  await userEvent.click(screen.getByText(/load greeting/i))

  // `act` waits all user actions have completed & DOM has been
  // repainted before moving on
  await act(() => screen.getByRole('alert'))

  // Assert
  expect(screen.getByRole('alert')).toHaveTextContent(/oops, failed to fetch!/i)
})
