/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { api } from "../api";

const register = (data: any) => api.post("/auth/register", data);
const login = (data: any) => api.post("/auth/login", data);
const logout = async () =>
  await axios.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );

export { register, login, logout };
