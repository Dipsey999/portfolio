import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import { SplashScreen } from "@/components/splash-screen";
import { NamePrompt } from "@/components/name-prompt";
import { FigJamCursor } from "@/components/figjam-cursor";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jizan K \u2014 Design Engineer",
    template: "%s \u2014 Jizan K",
  },
  description:
    "Design Engineer in Bengaluru. I design products and build them. Currently at Recotap.",
  openGraph: {
    title: "Jizan K \u2014 Design Engineer",
    description:
      "Design Engineer in Bengaluru. I design products and build them. Currently at Recotap.",
    url: "https://jizan.design",
    siteName: "Jizan K",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jizan K \u2014 Design Engineer",
    description:
      "Design Engineer in Bengaluru. I design products and build them. Currently at Recotap.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen">
        <ThemeProvider>
          <SmoothScroll />
          <SplashScreen />
          <NamePrompt />
          <FigJamCursor />
          <main className="relative z-10">{children}</main>
          <Navbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
