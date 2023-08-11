import axios from "axios";
import { BaseURL } from "./constants";

export function useRequestOpenAI(baseURL?: string) {
  const instan = axios.create({
    // url: "https://api.ai-yyds.com/v1/chat/completions",
    baseURL: baseURL || BaseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer"
    }
  });

  return instan.post("/v1/chat/completions", {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Say this is a test!" }],
    temperature: 0.7
  });
}
