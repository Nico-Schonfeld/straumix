import FooterContainer from "@/components/webapp/Footer/FooterContainer";
import HeaderContainer from "@/components/webapp/Header/HeaderContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Straumix | WebApp",
  description: "Straumix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderContainer />
      {children}
      <FooterContainer />
    </>
  );
}
