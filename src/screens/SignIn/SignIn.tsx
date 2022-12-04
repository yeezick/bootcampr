import styles from './SignIn.module.css'
import { useState, useEffect } from "react";
import { signIn } from '../../utilities/api/users'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../utilities/redux/store';
import { setAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { useNavigate } from 'react-router-dom';
import { SignInInterface } from '../../utilities/types/UserInterface';

const SignIn: React.FC = (): JSX.Element => {
  // State Variables
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignInInterface>({ email: '', password: '' });

  // Constants
  const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const invalidCredentialsMessage = <span className={styles.error_message}>Invalid Credentials</span>;

  // Event Handlers
  const formValidation = (): void => {
    const validEmailAddressProvided = formData.email.match(VALID_EMAIL_REGEX);
    const passwordFieldFilledOut = formData.password !== '';

    if (validEmailAddressProvided && passwordFieldFilledOut) setButtonDisabled(false);
    else setButtonDisabled(true);
  };

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const response = await signIn(formData)
    if (response?.message === "Invalid email or password") return setInvalidCredentials(true)

    dispatch(setAuthUser(response));
    navigate('/');
  };

  // Side Effects
  useEffect(() => {
    formValidation();
  }, [formData]);

  return (
    <div className={styles.sign_in_container}>
      <form className={styles.sign_in_form} onSubmit={handleSubmitForm}>
        <div className={styles.sign_in_inputs}>
          <h3>Sign-In</h3>

          <div className={styles.flex_column}>
            <label className={styles.input_label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              name="email"
              id="email"
              type="email"
              onChange={handleFormDataChange}
              required
            />
          </div>

          <div className={styles.flex_column}>
            <label className={styles.input_label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              name="password"
              id="password"
              type="password"
              onChange={handleFormDataChange}
              required
            />
          </div>
        </div>

        <button disabled={buttonDisabled} type="submit">
          Go
        </button>
      </form>
      <>{invalidCredentials && invalidCredentialsMessage}</>
    </div>
  );
};

export { SignIn };
