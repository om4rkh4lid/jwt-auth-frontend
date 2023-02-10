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
            <div class="px-4 py-5 my-5 text-center">
                <h1 class="display-5 fw-bold">Authentication & Authorization</h1>
                <div class="col-lg-6 mx-auto">
                  <p class="lead mb-4">Aliquam erat volutpat. In hac habitasse platea dictumst. Duis pharetra nunc lectus, a vestibulum arcu tempor id. Aenean vitae ex lacus. Quisque sit amet porta turpis, id tempus risus. Aenean vel dui nulla. Pellentesque a cursus odio, id iaculis magna. Aenean tincidunt arcu orci, quis aliquet ex posuere dictum. Duis pulvinar mauris eget elit pellentesque, ut commodo sapien venenatis. Praesent volutpat leo ac eros venenatis, at accumsan elit elementum.</p>
                  <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button type="button" class="btn btn-primary btn-lg px-4 gap-3" onClick={handleClick}>View Users</button>
                    <button type="button" class="btn btn-outline-danger btn-lg px-4" onClick={handleLogout}>Log Out</button>
                  </div>
                </div>
            </div>
          </div>
          : <Landing />}
    </>
  )
}

export default Home;