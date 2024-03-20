import "~/styles/globals.css";

import { Inter, JetBrains_Mono } from "next/font/google";
import { cn } from "~/lib/utils";
import { cookies } from "next/headers";
import { themeCookie } from "~/theme/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "AI Chat",
  description: "AI Chat with mutliple models",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieJar = cookies();
  const tc = cookieJar.get(themeCookie);

  return (
    <html lang="en" className={cn(tc ? tc.value : "system")}>
      <body className={cn("font-sans", inter.variable, jetbrainsMono.variable)}>
        {children}
      </body>
    </html>
  );
}
