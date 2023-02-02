import { register, reset, selectAuthUser, uiStatus } from '../../utilities/redux/slices/users/userSlice';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpInterface } from '../../utilities/types/UserInterface';
import { useAppDispatch, useAppSelector } from '../../utilities/redux/hooks';
import { BsEyeFill, BsEyeSlash } from 'react-icons/bs';
import './SignUp.scss';
import { emptySignUp } from '../../utilities/data/userConstants';

type PasswordMatchCases = null | boolean;
enum InputType {
  PASSWORD = 'password',
  TEXT = 'text'
};
enum PasswordType {
  PASSWORD = 'password',
  CONFIRM = 'confirmPassword'
};
interface PasswordInput {
  password: InputType,
  confirmPassword: InputType
};

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(uiStatus);
  const { _id: userId } = useAppSelector(selectAuthUser);
  const [inputTypes, setInputTypes] = useState<PasswordInput>({
    password: InputType.PASSWORD,
    confirmPassword: InputType.PASSWORD
  });
  const [passwordsMatch, togglePasswordsMatch] = useState<PasswordMatchCases>(null);
  const [formValues, setFormValues] = useState<SignUpInterface>(emptySignUp);
  const { confirmPassword, email, firstName, lastName, password } = formValues;

  useEffect(() => {
    if (status.isSuccess) {
      dispatch(reset());
      setFormValues(emptySignUp);
      navigate(`/users/${userId}/account-setup`);
      togglePasswordsMatch(null);
    }
  }, [status.isSuccess, dispatch]);

  useEffect(() => {
    if (password.length === 0 || confirmPassword.length === 0) {
      togglePasswordsMatch(null);
    } else if (password !== confirmPassword) {
      togglePasswordsMatch(false);
    } else {
      togglePasswordsMatch(true);
    }
  }, [password, confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(formValues));
  };

  const validateForm = () => {
    if (!passwordsMatch) return true;
    for (const value of Object.values(formValues)) {
      if (!value) return true;
    }
  };

  const PasswordMatchStatus: React.FC | null = () => {
    switch (passwordsMatch) {
      case true:
        return <h4 className="pwd-match">Passwords match!</h4>;
      case false:
        return <h4 className="pwd-mismatch">Passwords do not match</h4>;
      default:
        return null;
    }
  };

  const passwordsReveal = (passwordType: PasswordType) => {
    inputTypes[passwordType] === InputType.PASSWORD 
      ? setInputTypes({...inputTypes, [passwordType]: InputType.TEXT}) 
      : setInputTypes({...inputTypes, [passwordType]: InputType.PASSWORD})
  };

  return (
    <div className="signup-container">
      <h3>User Register</h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-input">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            value={firstName}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-input">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            value={lastName}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-input">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={email}
            autoComplete="off"
            required
          />
        </div>

        <div className="pwd-input">
          <div>
            <label>Password</label>
            {inputTypes.password === InputType.PASSWORD 
              ? (<BsEyeSlash onClick={() => passwordsReveal(PasswordType.PASSWORD)} className="pwd-reveal-gray" />) 
              : (<BsEyeFill onClick={() => passwordsReveal(PasswordType.PASSWORD)} className="pwd-reveal" />)
            }
            <input
              type={inputTypes.password}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={password}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="pwd-input">
          <div>
            <label>Confirm Password</label>
            {inputTypes.confirmPassword === InputType.PASSWORD 
              ? (<BsEyeSlash onClick={() => passwordsReveal(PasswordType.CONFIRM)} className="pwd-reveal-gray" />) 
              : (<BsEyeFill onClick={() => passwordsReveal(PasswordType.CONFIRM)} className="pwd-reveal" />)
            }
            <input
              type={inputTypes.confirmPassword}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={confirmPassword}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="form-btn">
          <button type="submit" disabled={validateForm()}>
            Create Account
          </button>
        </div>
      </form>
      <PasswordMatchStatus />
    </div>
  );
};
