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
      : <div className="card form-signin">
        <div>
          <form onSubmit={handleSubmit}>

            {errorMsg ? <pre style={{ color: 'red' }}>{errorMsg}</pre> : null}

            <h1 className="h3 mb-3 fw-normal text-center">Sign Up</h1>

            <div class="mb-3">
              <label htmlFor="emailInput" class="form-label">Email address:</label>
              <div class="input-group">
                <input
                  className="form-control"
                  type="email"
                  id="emailInput"
                  placeholder="name@something.com"
                  value={email}
                  onChange={(e => setEmail(e.target.value))}
                />
              </div>
            </div>

            <div class="mb-3">
              <label htmlFor="passwordInput" class="form-label">Password:</label>
              <div class="input-group">
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  id="passwordInput"
                  onChange={(e => setPassword(e.target.value))}
                />
              </div>
            </div>

            <div class="mb-3">
              <label htmlFor="confirmPasswordInput" class="form-label">Confirm password:</label>
              <div class="input-group">
                <input
                  className="form-control"
                  type="password"
                  value={confirmPassword}
                  id="confirmPasswordInput"
                  onChange={(e => setConfirmPassword(e.target.value))}
                />
              </div>
            </div>

            <input className="w-100 btn btn-lg btn-primary" type="submit" value="Sign Up" disabled={!password || confirmPassword !== password}></input>

          </form>
        </div>
      </div>
  );
}