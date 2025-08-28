import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { Toaster } from "sonner";
import ProviderAuth from "@/components/ProviderAuth/ProviderAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Straumix",
  description:
    "Straumix es una plataforma inteligente de gestión financiera basada en la metodología 50/30/20. Diseñada para personas, parejas y organizaciones, Straumix te permite visualizar, organizar y optimizar tus gastos de forma clara, colaborativa y estratégica.",
  keywords: [
    "straumix",
    "finanzas",
    "metodología 50/30/20",
    "gestión financiera",
    "finanzas personales",
    "finanzas familiares",
    "finanzas empresariales",
  ],
  authors: [{ name: "Straumix", url: "https://straumix.com" }],
  creator: "Straumix",
  publisher: "Straumix",
  openGraph: {
    title: "Straumix",
    description:
      "Straumix es una plataforma inteligente de gestión financiera basada en la metodología 50/30/20. Diseñada para personas, parejas y organizaciones, Straumix te permite visualizar, organizar y optimizar tus gastos de forma clara, colaborativa y estratégica.",
    url: "https://straumix.com",
    siteName: "Straumix",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Straumix" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Straumix",
    description:
      "Straumix es una plataforma inteligente de gestión financiera basada en la metodología 50/30/20. Diseñada para personas, parejas y organizaciones, Straumix te permite visualizar, organizar y optimizar tus gastos de forma clara, colaborativa y estratégica.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  metadataBase: new URL("https://straumix.com"),
  alternates: {
    canonical: "https://straumix.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  applicationName: "Straumix",
  appleWebApp: {
    title: "Straumix",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#000000",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProviderAuth>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </ProviderAuth>
      </body>
    </html>
  );
}
