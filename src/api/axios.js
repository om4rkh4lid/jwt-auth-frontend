import axios from "axios";

const BASE_URL = 'http://localhost:5000/api/v1'

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,

})

// The Access-Control-Allow-Credentials response header tells browsers whether
// to expose the response to the frontend JavaScript code when the request's
// credentials mode (Request.credentials) is include.
// When a request's credentials mode (Request.credentials) is include, 
// browsers will only expose the response to the frontend JavaScript code
// if the Access-Control-Allow-Credentials value is true.
// Credentials are cookies, authorization headers, or TLS client certificates.
// The Access-Control-Allow-Credentials header works in conjunction with the
//  XMLHttpRequest.withCredentials property or with the credentials option in
// the Request() constructor of the Fetch API. For a CORS request with 
// credentials, for browsers to expose the response to the frontend JavaScript
// code, both the server (using the Access-Control-Allow-Credentials header)
// and the client (by setting the credentials mode for the XHR, Fetch, or Ajax
// request) must indicate that they're opting into including credentials.