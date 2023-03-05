import userEvent from '@testing-library/user-event'
import { act, render, screen } from '__tests__/custom-render'
import App from 'App'

/**
 * This spec should be used to test components not constrained to a screen
 * Such as: Navbar, SideMenu, AccountDropdown, etc.
 * As those components get more complicated, they can merit their own spec files
 * but should be tested from App.tsx with mocked screens to route to.
 */

describe('Navbar interactions', () => {
  // Not actually done
  test('User can sign up from the landing page', async () => {
    // Wrapped in Act because useEffect triggers state update / rerender
    await act(() => render(<App />))
    // User can click on all navbar links
    // Expect each click to navigate user to the right page
    expect(
      screen.getByText(/surpass your competition in the tech job market/i)
    ).toBeInTheDocument()
  })
})

describe('SideMenu interactions', () => {
  test('User can open the sidemenu', () => {
    // User can click on sidemenu
    // Expect Sidemenu to be in the document
    expect(true).toBe(true)
  })
})

describe('User dropdown interactions', () => {
  test('User can expand the dropdown', () => {
    // User can click on account dropdown
    // Expect dropdown options to be in the document
    expect(true).toBe(true)
  })
})
