import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((congfig)=>{
  const token ="";
  if(token){
    congfig.headers["x-access-token"] = token
  }
  return congfig;
});

export default instance;
