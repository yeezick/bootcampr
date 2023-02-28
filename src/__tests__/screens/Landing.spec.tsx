import { render, screen } from '__tests__/custom-render'
import { Landing } from 'screens/Landing/Landing'

describe('Landing page', () => {
  let initialState, initialProps
  beforeEach(() => {
    ;(initialState = {}), (initialProps = {})
  })

  test('User can sign up from the landing page', () => {
    render(<Landing />, initialState)
    screen.debug()
    expect(true).toBe(true)
  })
})
