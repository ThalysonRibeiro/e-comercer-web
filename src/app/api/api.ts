import axios from "axios";

export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Nota: sem NEXT_PUBLIC_
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_BACKEND_API_KEY, // substitua pela chave correta
  },
});