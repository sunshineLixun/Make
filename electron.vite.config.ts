import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import React from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import presetAttributify from "@unocss/preset-attributify";
import presetUno from "@unocss/preset-uno";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        "@r": resolve("src/renderer/src")
      }
    },
    plugins: [
      UnoCSS({
        presets: [presetUno(), presetAttributify()]
      }),
      React()
    ]
  }
});
