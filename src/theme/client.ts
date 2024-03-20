"use client";

import { themeCookie, type Theme } from "./config";
import cookieJar from "js-cookie";

export const getTheme = () => {
  const tc = cookieJar.get(themeCookie) as Theme;

  if (tc) {
    const theme = tc.split("=")[1];
    if (theme === "dark" || theme === "light") {
      return theme;
    }
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    cookieJar.set(themeCookie, system, { path: "/", expires: 365 });

    return system;
  } else {
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    cookieJar.set(themeCookie, system, { path: "/", expires: 365 });
    return system;
  }
};

export const setTheme = (theme: Theme) => {
  cookieJar.set(themeCookie, theme, { path: "/", expires: 365 });
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(theme);
};
