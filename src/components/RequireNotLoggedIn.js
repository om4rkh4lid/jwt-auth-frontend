import useAuth from "../hooks/useAuth"
import useRefresh from "../hooks/useRefresh";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const RequireNotLoggedIn = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const refresh = useRefresh();

  const verifyNotLoggedIn = async () => {
    try {
      await refresh();
      navigate('/');
    } catch (error) {
      // then we're in the right spot
    }
  }

  useEffect(() => {
    if (accessToken) {
      navigate('/');
    } else {
      verifyNotLoggedIn();
    }
  }, []);

  return(
    !accessToken && <Outlet />
  );
}

export default RequireNotLoggedIn;