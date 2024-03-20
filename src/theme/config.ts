export const themes = ["dark", "light", "system"] as const;
export type Theme = (typeof themes)[number];

export const defaultTheme: Theme = "system";
export const themeCookie = "aicademy-theme";
