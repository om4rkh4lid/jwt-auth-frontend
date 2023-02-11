import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/Content.css"

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

  return (
    data
      ?
      <div className="container content">
        <h2>List of users in the system:</h2>
        <div className="list-group w-auto">
          {data.map((user, index) => {
            return (
              <a key={index} href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                <div className="d-flex gap-2 w-100 justify-content-between">
                  <div>
                    <h6 className="mb-0">User {index + 1}</h6>
                    <p className="mb-0 opacity-75">{user.email}</p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
      : error ? <h1>{error.message}</h1> : <h1>This is a protected route...</h1>
  );
}

export default Content