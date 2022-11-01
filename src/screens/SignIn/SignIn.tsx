import styles from './SignIn.module.css'
import { useState, useEffect } from "react";
import { signIn } from '../../utilities/api/users.js'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../utilities/redux/store'
import { setAuthUser } from '../../utilities/redux/slices/users/userSlice'
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string
  password: string
}

const SignIn: React.FC = (): JSX.Element => {
  // State Variables
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" })

  // Constants
  const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  // Event Handlers
  const formValidation = (): void => {
    const validEmailAddressProvided = formData.email.match(VALID_EMAIL_REGEX)
    const passwordFieldFilledOut = formData.password !== ''

    if (validEmailAddressProvided && passwordFieldFilledOut) setButtonDisabled(false)
    else setButtonDisabled(true)
  }

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmitForm = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    const response = await signIn(formData)
    if (response.unauthorized) return setInvalidCredentials(true)

    dispatch(setAuthUser(response))
    navigate('/')
  }

  // Side Effects
  useEffect(() => {
    formValidation()
  }, [formData])

  return (
    <>
      <form className={styles.sign_in_form} onSubmit={handleSubmitForm}>

        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          onChange={handleFormDataChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          onChange={handleFormDataChange}
          required
        />

        <button disabled={buttonDisabled} type="submit">Go</button>

        <p>{invalidCredentials && <span>Invalid Credentials</span>}</p>
      </form>
    </>
  );
};

export default SignIn;
