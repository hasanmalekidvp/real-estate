/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../api";

const addPost = (data: any) => api.post("/posts", data);

export { addPost };
