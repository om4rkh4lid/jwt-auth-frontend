import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import useRefresh from "../hooks/useRefresh";
import Landing from "./Landing";

const Home = () => {

  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();
  const refresh = useRefresh();
  const axiosPrivate = useAxiosPrivate();

  const handleClick = (e) => {
    navigate('users', { replace: true });
  }

  const handleLogout = async (e) => {
    try {
      await axiosPrivate.post('/auth/logout');
      setAccessToken("");
    } catch (error) {
      console.log(error);
      console.log('something went wrong while logging you out...');
    }
  }

  const refreshOrRedirect = async () => {
    try {
      await refresh();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!accessToken) {
      refreshOrRedirect();
    }
  }, []);

  return (
    <>
      {
      accessToken ?
      <div>
        <h1>You are logged in...</h1>
        <button onClick={handleClick}>View Users</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
       : <Landing />}
    </>
  )
}

export default Home;