import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefresh = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
      const response = await axios.get('/auth/refresh')
      setAuth(prev => { 
        return { accessToken: response.data.accessToken }
      });
      
      return response.data.accessToken;
  }

  return refresh;
}

export default useRefresh;