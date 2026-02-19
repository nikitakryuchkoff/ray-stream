import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font",
  display: "swap",
});

const SITE_URL = "https://raystream.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RayStream International — Трейдинг и инжиниринг профессионального освещения",
    template: "%s | RayStream International",
  },
  description:
    "RayStream International — глобальный сорсинг, светотехнический аудит и поставка профессионального освещения.",
  keywords: [
    "профессиональное освещение",
    "светотехническое оборудование",
    "промышленное освещение",
    "архитектурное освещение",
    "LED освещение",
    "светотехнический аудит",
    "сорсинг освещения Китай",
    "поставка светотехники",
    "lighting trading",
    "lighting engineering",
    "professional lighting",
    "RayStream",
  ],
  authors: [{ name: "RayStream International Limited" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
