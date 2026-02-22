import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // your backend
// });

const API = axios.create({
  baseURL: `${process.env.VITE_API_URL}/api/promises`, // your backend
});
export default API;
