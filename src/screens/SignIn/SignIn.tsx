import styles from './SignIn.module.css'
import React, { useState, useRef } from "react";
import { signIn } from '../../api/users.js'

const SignIn: React.FC = (): JSX.Element => {
  // State Variables
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [apiResponse, setApiResponse] = useState<any>()
  // Element References
  const passwordRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  // Constants
  const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // Event Handlers
  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const validEmailAddressProvided = emailRef.current?.value.match(VALID_EMAIL_REGEX)
    const passwordFieldFilledOut = passwordRef.current?.value !== ''

    if (validEmailAddressProvided && passwordFieldFilledOut) setButtonDisabled(false)
    else setButtonDisabled(true)
  }

  const handleSubmitForm = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    const credentials = { email: emailRef.current?.value, password: passwordRef.current?.value }
    const test = await signIn(credentials)
    setApiResponse(test)
  }

  return (
    <>
      <form className={styles.sign_in_form} onSubmit={handleSubmitForm}>

        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          onChange={handleFormDataChange}
          ref={emailRef}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          onChange={handleFormDataChange}
          ref={passwordRef}
          required
        />

        <button disabled={buttonDisabled} type="submit">Go</button>

        <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
      </form>
    </>
  );
};

export default SignIn;
