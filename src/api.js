import axios from "axios";

const API = axios.create({
  baseURL: "https://bihar-manifesto-tracker.onrender.com",
});

export default API;