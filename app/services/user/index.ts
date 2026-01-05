import { api } from "../api";

const getUserInfo = () => api.get("/users/userInfo");

export { getUserInfo };
