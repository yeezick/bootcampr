import styles from './SignIn.module.css'
import { useState, useEffect } from "react";
import { signIn } from '../../utilities/api/users'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../utilities/redux/store';
import { setAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { useNavigate } from 'react-router-dom';
import { SignInInterface } from '../../utilities/types/UserInterface';
import { FaInfoCircle } from 'react-icons/fa';

const SignIn: React.FC = (): JSX.Element => {
  // State Variables
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState<SignInInterface>({ email: '', password: '' });
  const [alertBanner, setAlertBanner] = useState<any>({ status: false,
  txt: '' })

  // Constants
  const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

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

    const response = await signIn(formData);
    console.log('RESP', response)
    if (response?.message) {
      setAlertBanner({ status: true, txt: response.message })

      setTimeout(() => {
        setAlertBanner({ status: false })
      }, 10000);
      return
    }

    dispatch(setAuthUser(response));
    navigate('/');
  };

  // Side Effects
  useEffect(() => {
    formValidation();
  }, [formData]);

  return (
    <div>
      <div>
        {alertBanner.status ? (
            <div className='alert-banner-sent'>
              <FaInfoCircle />
              <p dangerouslySetInnerHTML={{ __html: alertBanner.txt }} />
            </div>
          ) : ''
        }
      </div>
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
      </div>
    </div>
  );
};

export { SignIn };
