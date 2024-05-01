import axios from "axios";

export default function axiosInstance() {
  const axiosInstance = axios.create({
    // baseURL: 'https://pro-man-server.vercel.app',
    baseURL: 'http://localhost:5000',
  })

  return axiosInstance;
}