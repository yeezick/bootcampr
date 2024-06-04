// TODO: turn email creds into env var
// TODo: should email apis be mocked?

describe('Login screen', () => {
  beforeEach(() => {
    cy.visit('/sign-in')
    cy.get('h1').contains('Log in').should('be.visible')
  })

  it('User can log in', () => {
    login('svc.jira.swe@gmail.com', 'gumballs')
    cy.url().should('include', '/project/')
    cy.window().its('localStorage.bootcamprAuthToken').should('be.a', 'string')
  })

  it('User receives error for incorrect password', () => {
    const loginErrorText = "User ID and password don't match. Please try again."
    login('svc.jira.swe@gmail.com', 'wrongpw')
    cy.contains(loginErrorText).should('be.visible')
    cy.window().its('localStorage.bootcamprAuthToken').should('not.exist')
  })

  it('User can navigate to sign up screen', () => {
    cy.get('a[href="/sign-up"').click()
    cy.url().should('include', '/sign-up')
  })

  it('User can successfully go through forgot password flow', () => {
    cy.intercept('POST', '/reset-password', {
      statusCode: 201,
      body: {
        status: true,
        message: 'Reset password verification email successfully sent',
        friendlyMessage:
          "We've sent a verification link to your email address. Please click on the link that has been sent to your email to reset your account password. The link expires in 30 minutes.",
        invalidCredentials: false,
      },
    })
    fillOutForgotPassword()
    cy.url().should('include', '/success?screen=reset_password_email')
  })

  it('User cannot proceed past forgot password flow', () => {
    cy.intercept('POST', '/reset-password', {
      statusCode: 400,
      body: {
        status: false,
        message: 'Failed to reset password',
        friendlyMessage:
          'There was an issue sending your reset password verification email. Please try again or contact support.',
      },
    })
    fillOutForgotPassword()
    cy.get('.common-modal.error-message').should('be.visible')
  })
})

const login = (email, password) => {
  const emailInput = 'input[name="email"]'
  const loginButton = 'button[aria-label="Log in button"]'
  const passwordInput = 'input[name="password"]'
  cy.get(loginButton).should('be.disabled')
  cy.get(emailInput).type(email)
  cy.get(passwordInput).type(password)
  cy.get(loginButton).should('be.enabled')
  cy.get(loginButton).click()
}

const fillOutForgotPassword = () => {
  const forgotPasswordEmailInput = '.common-modal.input'
  const sendForgotPasswordEmailButton = 'button[aria-label="Send email button"'
  cy.get('#forgot-password-link').click()
  cy.get(sendForgotPasswordEmailButton).should('be.disabled')
  cy.get(forgotPasswordEmailInput).should('be.visible')
  cy.get(forgotPasswordEmailInput).type('svc.jira.swe@gmail.com')
  cy.get(sendForgotPasswordEmailButton).should('be.enabled')
  cy.get(sendForgotPasswordEmailButton).click()
}
