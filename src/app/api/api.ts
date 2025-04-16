import axios from "axios";

export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Nota: sem NEXT_PUBLIC_
});