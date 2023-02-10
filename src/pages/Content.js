import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Content = () => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  const [error, setError] = useState("");

  const fetchUserList = async () => {
    try {
      const response = await axiosPrivate.get('/users');
      setData(response.data);
    } catch (error) {
      setError(error);
    }

  }

  useEffect(() => {
    fetchUserList();
  }, []);

  return(
    data
      ? <ul>{data.map(user => <li key={user.id}>{user.email}</li>)}</ul>
      : error ? <h1>{error.message}</h1> : <h1>This is a protected route...</h1>
  );
}

export default Content