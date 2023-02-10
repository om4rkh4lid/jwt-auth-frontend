import { NavLink } from "react-router-dom";

import "../styles/Landing.css"

const Landing = () => {
  return (

      <div>
        <div class="px-4 py-5 my-5 text-center">
          <h1 class="display-5 fw-bold">Landing Page</h1>
          <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">This is what a user who isn't authenticated sees.</p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <NavLink className="btn btn-primary btn-lg px-4 gap-3" to='/login'>Login</NavLink>
              <NavLink className="btn btn-outline-danger btn-lg px-4" to='/register'>Sign Up</NavLink>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Landing;