import axios from "axios";
import { BaseURL } from "./constants";

const axiosIns = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer",
    "Cache-Control": "no-store"
  }
});

export function usePostRequest(data: any = {}) {
  return axiosIns.post("/v1/chat/completions", {
    model: "gpt-3.5-turbo",
    messages: data,
    temperature: 0.7
  });
}
