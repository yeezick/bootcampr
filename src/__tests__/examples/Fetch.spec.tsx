import * as React from 'react'
import { fireEvent, render, screen, waitFor } from '../custom-render'
import userEvent from '@testing-library/user-event'
import { Fetch } from './Fetch'

test('Loads and displays greeting', async () => {
  // Arrange
  render(<Fetch url='/greeting/success' />)

  // Act
  await userEvent.click(screen.getByText(/load greeting/i))
  await waitFor(() => screen.getByRole('heading'))

  // Assert
  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toBeDisabled()
})

test('Handles server error', async () => {
  // Arrange
  render(<Fetch url='/greeting/failure' />)

  // Act
  fireEvent.click(screen.getByText(/load greeting/i))

  // Wait until the `get` request resolves and the component calls the
  // component calls setState and re-renders.
  // `waitFor` waits until the callback doesn't throw an error
  await waitFor(() => screen.getByRole('alert'))

  // Assert
  expect(screen.getByRole('alert')).toHaveTextContent(/oops, failed to fetch!/i)
  expect(screen.getByRole('button')).not.toBeDisabled()
})
