import styles from './SignIn.module.css'
import React, { useState, useRef } from "react";
import { signIn } from '../../utilities/api/users.js'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../utilities/redux/store'
import { selectAuthUser, setAuthUser } from '../../utilities/redux/slices/users/userSlice'
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = (): JSX.Element => {
  // State Variables
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false)
  // Element References
  const passwordRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  // Constants
  const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

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
    let response = await signIn(credentials)
    if (response.unauthorized) return setInvalidCredentials(true)

    dispatch(setAuthUser(response))
    navigate('/')
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

        <p>{invalidCredentials && <span>Invalid Credentials</span>}</p>
      </form>
    </>
  );
};

export default SignIn;
