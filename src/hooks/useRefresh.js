import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefresh = () => {
  const { setAccessToken } = useAuth();

  const refresh = async () => {
      const response = await axios.get('/auth/refresh')
      setAccessToken(prev => response.data.accessToken);
      return response.data.accessToken;
  }

  return refresh;
}

export default useRefresh;