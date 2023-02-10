import { useEffect } from "react";
import { axiosPrivate } from "../api/axios"
import useAuth from "./useAuth"
import useRefresh from "./useRefresh";

const useAxiosPrivate = () => {
  const { accessToken } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    // set a request interceptor for authenticated request
    const requestAuthorization = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
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
        console.log('before', prevRequest);
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          console.log('after', prevRequest);
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestAuthorization);
      axiosPrivate.interceptors.response.eject(responseRefresh);
    }
  }, [accessToken, refresh]);

  return axiosPrivate;

}

export default useAxiosPrivate;