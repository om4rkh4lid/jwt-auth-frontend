import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import "../styles/Login.css";

export default function Login(props) {
  const LOGIN_ENDPOINT = '/auth/login'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const clearFields = () => {
    setEmail('');
    setPassword('');
  }

  const handleError = (error) => {
    setErrorMsg(error.data.message);
  }

  const handleSuccess = (data) => {
    clearFields();
    setAccessToken(data.accessToken);
    navigate('/', { replace: true });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(LOGIN_ENDPOINT, { email, password });
      handleSuccess(response.data)
    } catch (error) {
      console.log(error);
      handleError(error.response)
    }
  }

  useEffect(() => {
    setErrorMsg('')
  }, [email, password]);
  
  useEffect(() => {
    console.log(location);
  }, []);

  return (<div className="form-card">
    {errorMsg ? <pre style={{ color: 'red' }}>{errorMsg}</pre> : null}
    <h1 className="card-title">{accessToken ? `Hello` : 'Please Log In'}</h1>
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

      <input className="form-input" type="submit" value="Login"></input>
    </form>

    <a className="forgot-password-link">Forgot your password?</a>

  </div>);
}