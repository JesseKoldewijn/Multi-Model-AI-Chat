import "~/styles/globals.css";

import { Inter, JetBrains_Mono } from "next/font/google";
import { cn } from "~/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
  return (
    <html lang="en">
      <body className={cn("font-sans", inter.variable, jetbrainsMono.variable)}>
        {children}
      </body>
    </html>
  );
}
