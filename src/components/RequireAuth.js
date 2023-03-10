import useAuth from "../hooks/useAuth"
import useRefresh from "../hooks/useRefresh";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const RequireAuth = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const refresh = useRefresh();

  const refreshOrRedirect = async () => {
    try {
      await refresh();
    } catch (error) {
      navigate('/login', { replace: true });
    }
  }

  useEffect(() => {
    if (!auth.accessToken) {
      refreshOrRedirect();
    }
    console.log(auth);
  }, [auth]);

  return(
    auth.accessToken && <Outlet />
  );
}

export default RequireAuth;