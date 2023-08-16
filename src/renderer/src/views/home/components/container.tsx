// import { usePostRequest } from "@r/service/request-openai";
import React, { useEffect, useState } from "react";
import { isValidHttpUrl } from "@r/utils/is";

export default function Container() {
  const [videoUrl, setVideoUrl] = useState("");
  const [disabled, setDisabled] = useState(true);

  const onInput = (el: React.ChangeEvent<HTMLInputElement>) => {
    const value = el.target.value;
    setVideoUrl(value);
    const isValid = isValidHttpUrl(value);
    setDisabled(!isValid);
  };

  useEffect(() => {
    // usePostRequest([
    //   {
    //     role: ""
    //   }
    // ]).then(res => {
    //   console.log(res);
    // });
    window.api.downloadYtHandler((_, result) => {
      console.log("downloadYtHandler", result);
    });
  }, []);

  const onDownload = () => {
    window.api.downloadYtubeVideo(videoUrl);
  };

  // https://www.youtube.com/watch?v=vPZ83zEqRyg
  return (
    <div className="w-[calc(100%-240px)] h-100%">
      <input
        className="w-100 h-20 rounded-lg focus:outline-none"
        type="text"
        value={videoUrl}
        placeholder="请输入你想翻译的Youtube视频链接"
        onInput={onInput}
      ></input>
      <button disabled={disabled} onClick={onDownload}>
        下载
      </button>
    </div>
  );
}
