import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // your backend
// });
console.log("API URL:", import.meta.env.VITE_API_URL);
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/promises`, // your backend
});
export default API;
