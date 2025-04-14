import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:5047/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const httpFetcher = (url: string) =>
  http.get(url).then((res) => res.data);
