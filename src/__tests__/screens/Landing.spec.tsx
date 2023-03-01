import { render, screen } from '__tests__/custom-render'
import { Landing } from 'screens/Landing/Landing'

describe('Landing page', () => {
  test('User can sign up from the landing page', () => {
    render(<Landing />)
    expect(
      screen.getByText(/surpass your competition in the tech job market/i)
    ).toBeInTheDocument()
  })
})
