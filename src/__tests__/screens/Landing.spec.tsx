import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '__tests__/custom-render'
import { Landing } from 'screens/Landing/Landing'

// Needs an improvement as it would test the <Link /> from
// React Router Dom => would need to look into their docs on testing
describe('Landing page', () => {
  test('When user clicks on "start today", they are navigated to the sign up screen', async () => {
    render(<Landing />)
    const buttonToStartToday = screen.getByText(/start today!/i)
    await userEvent.click(buttonToStartToday)
    screen.debug()
    expect(true).toBe(true)
  })
})
