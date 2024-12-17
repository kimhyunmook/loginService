import axios from "axios";

const instance = axios.create({
  baseURL: "https://learn.codeit.kr/api/avatar-service",
  withCredentials: true,
});
// instance.interceptors.response.use()
export default instance;
