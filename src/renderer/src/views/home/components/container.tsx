import { useRequestOpenAI } from "@r/service/request-openai";
import React, { useEffect, useState } from "react";

export default function Container() {
  const [videoUrl, setVideoUrl] = useState("");

  const onInput = (el: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(el.target.value);
  };

  useEffect(() => {
    useRequestOpenAI("https://api.ai-yyds.com").then(res => {
      console.log(res);
    });
  }, []);

  return (
    <div className="w-[calc(100%-240px)] h-100% bg-#404258">
      <input
        className="w-500px h-60px rounded-lg focus:outline-none"
        type="text"
        value={videoUrl}
        placeholder="请输入你想翻译的Youtube视频链接"
        onInput={onInput}
      />
    </div>
  );
}
