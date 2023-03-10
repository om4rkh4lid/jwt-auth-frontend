import useAuth from "../hooks/useAuth"
import useRefresh from "../hooks/useRefresh";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const RequireNotLoggedIn = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const refresh = useRefresh();

  const verifyNotLoggedIn = async () => {
    try {
      await refresh();
      navigate('/', {replace: true});
    } catch (error) {
      // then we're in the right spot
    }
  }

  useEffect(() => {
    if (auth.accessToken) {
      navigate('/');
    } else {
      verifyNotLoggedIn();
    }
  }, []);

  return(
    !auth.accessToken && <Outlet />
  );
}

export default RequireNotLoggedIn;