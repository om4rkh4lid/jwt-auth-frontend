import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios";
import "../styles/Login.css";


export default function Register(props) {
  const REGISTER_ENDPOINT = '/auth/register'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  const handleError = (error) => {
    setErrorMsg(error.data.message);
  }

  const handleSuccess = (data) => {
    setSuccess(true);
    clearFields();
    setTimeout(() => {
      navigate('/login');
    }, 1000)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(REGISTER_ENDPOINT, { email, password, confirmPassword });
      handleSuccess(response.data)
    } catch (error) {
      console.log(error);
      handleError(error.response)
    }
  }

  useEffect(() => {
    setErrorMsg('')
  }, [email, password]);

  return (
    success
      ? <h1>Successfully signed up, redirecting you to login...</h1>
      : <div className="form-card">
        {errorMsg ? <pre style={{ color: 'red' }}>{errorMsg}</pre> : null}
        <h1 className="card-title">{'Create an account'}</h1>
        <form className="form-container" onSubmit={handleSubmit}>

          <div className="form-input-group">
            <label htmlFor="emailIput">Enter your email:</label>
            <input
              className="form-input"
              type="email"
              id="emailInput"
              value={email}
              onChange={(e => setEmail(e.target.value))}
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="passwordInput">Enter your password:</label>
            <input
              className="form-input"
              type="password"
              value={password}
              id="passwordInput"
              onChange={(e => setPassword(e.target.value))}
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="passwordInput">Confirm your password:</label>
            <input
              className="form-input"
              type="password"
              value={confirmPassword}
              id="confirmPasswordInput"
              onChange={(e => setConfirmPassword(e.target.value))}
            />
          </div>

          <input className="form-input" type="submit" value="Register" disabled={!password || (confirmPassword !== password)}></input>
        </form>

        <a className="forgot-password-link">Forgot your password?</a>

      </div>
  );
}