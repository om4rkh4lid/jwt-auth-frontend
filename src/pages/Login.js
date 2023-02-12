import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import "../styles/Login.css";

export default function Login(props) {
  const LOGIN_ENDPOINT = '/auth/login'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const clearFields = () => {
    setEmail('');
    setPassword('');
  }

  const handleError = (error) => {
    setErrorMsg(error.data.message);
  }

  const handleSuccess = (data) => {
    clearFields();
    setAuth({data});
    navigate('/', { replace: true });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(LOGIN_ENDPOINT, { email, password });
      handleSuccess(response.data)
    } catch (error) {
      handleError(error.response)
    }
  }

  useEffect(() => {
    setErrorMsg('')
  }, [email, password]);

  return (
    <div className="card form-signin">
      <div>
        <form onSubmit={handleSubmit}>

          {errorMsg ? <pre style={{ color: 'red' }}>{errorMsg}</pre> : null}

          <h1 className="h3 mb-3 fw-normal text-center">Please Log In</h1>

          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">Email address:</label>
            <div className="input-group">
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

          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">Password:</label>
            <div className="input-group">
            <input
              className="form-control"
              type="password"
              value={password}
              id="passwordInput"
              onChange={(e => setPassword(e.target.value))}
            />
            </div>
          </div>

          <input className="w-100 btn btn-lg btn-primary" type="submit" value="Log In"></input>

        </form>
      </div>
    </div>

  );
}