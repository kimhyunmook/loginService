import type { Metadata } from "next";
import "./styles/globals.css";
import Providers from "./lib/contexts/providers";
import Header from "@/app/lib/components/ui/Header";
import Container from "./lib/components/layout/Container";

export const metadata: Metadata = {
  title: "Login Service",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const height = "70px";
  const ContainerStlye = {
    paddingTop: height,
    paddingBottom: height,
  };
  return (
    <html lang="ko">
      <body>
        <Container style={ContainerStlye}>
          <Providers>
            <Header height={height} />
            {children}
          </Providers>
        </Container>
      </body>
    </html>
  );
}
