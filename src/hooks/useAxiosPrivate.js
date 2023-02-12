import { useEffect } from "react";
import { axiosPrivate } from "../api/axios"
import useAuth from "./useAuth"
import useRefresh from "./useRefresh";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    // set a request interceptor for authenticated request
    const requestAuthorization = axiosPrivate.interceptors.request.use(
      config => {
        console.log('access token at intercept');
        console.log(auth);
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
          console.log('config header', config.headers['Authorization']);
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // set a response interceptor for expired access tokens
    const responseRefresh = axiosPrivate.interceptors.response.use(
      // we don't do anything if it's successful
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestAuthorization);
      axiosPrivate.interceptors.response.eject(responseRefresh);
    }
  }, [auth, refresh]);

  return axiosPrivate;

}

export default useAxiosPrivate;