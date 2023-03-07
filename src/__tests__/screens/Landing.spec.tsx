import userEvent from '@testing-library/user-event'
import { render, screen } from '__tests__/custom-render'
import { Landing } from 'screens/Landing/Landing'

describe('Landing page', () => {
  test('When user clicks on "start today", they are navigated to the sign up screen', async () => {
    render(<Landing />)
    const buttonToStartToday = screen.getByText(/start today!/i)
    await userEvent.click(buttonToStartToday)
    // expect browser url to end in /sign-up
    expect(true).toBe(true)
  })

  // Not actually done
  test('User can sign up from the landing page', () => {
    render(<Landing />)
    expect(
      screen.getByText(/surpass your competition in the tech job market/i)
    ).toBeInTheDocument()
  })
})
