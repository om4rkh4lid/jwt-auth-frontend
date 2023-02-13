import { decodeToken } from "react-jwt";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefresh = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
      const response = await axios.get('/auth/refresh');
      const token = response.data.accessToken;
      const decodedToken = decodeToken(token);

      setAuth(prev => { 
        return { accessToken: response.data.accessToken, ...decodedToken }
      });
      
      return token;
  }

  return refresh;
}

export default useRefresh;