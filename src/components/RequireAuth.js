import useAuth from "../hooks/useAuth"
import useRefresh from "../hooks/useRefresh";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const RequireAuth = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const refresh = useRefresh();

  const refreshOrRedirect = async () => {
    try {
      await refresh();
    } catch (error) {
      navigate('/login');
    }
  }

  useEffect(() => {
    if (!accessToken) {
      refreshOrRedirect();
    }
  }, []);

  

  return(
    accessToken && <Outlet />
  );
}

export default RequireAuth;