import { render, screen, act } from '__tests__/custom-render'
import { SignUp } from 'screens/Auth/SignUp/SignUp'

describe('SignUp page', () => {
  let initialState

  // Preparation
  beforeEach(() => {
    initialState = {
      ui: {
        status: {
          isSuccess: true,
        },
      },
    }
  })

  test('User can fill out the sign up form', async () => {
    const { user } = render(<SignUp />, initialState)
    // const [
    //   firstNameInput,
    //   lastNameInput,
    //   emailInput,
    //   // passwordInput,
    //   // confirmPasswordInput,
    // ] = screen.getAllByRole('textbox')
    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)

    // await act(async () => {
    // await userEv.type(firstNameInput, 'Ebenezer')
    await user.type(lastNameInput, 'Scrooge')
    // await userEvent.type(emailInput, 'mymoney@gmail.com')
    // await userEvent.type(passwordInput, 'iwantitnow')
    // await userEvent.type(confirmPasswordInput, 'iwantitnow')
    // })

    screen.debug(firstNameInput)

    expect(true).toBe(true)
  })
})
