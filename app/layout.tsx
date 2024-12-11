import type { Metadata } from "next";
import "./globals.css";
import Providers from "./lib/contexts/providers";

export const metadata: Metadata = {
  title: "Login Service",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={``}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
