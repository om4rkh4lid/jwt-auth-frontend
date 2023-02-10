import { NavLink } from "react-router-dom";

import "../styles/Landing.css"

const Landing = () => {
  return (
    <div>
      <nav className="navbar">
        <NavLink className="nav-link" to='/login'>Login</NavLink>
        <NavLink className="nav-link" to='/register'>Sign Up</NavLink>
      </nav>
      <div className="hero">
        <h1>Welcome to my app!</h1>
        <p>This is some text that no one is probably going to read</p>
      </div>
    </div>
  );
}

export default Landing;