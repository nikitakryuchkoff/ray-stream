import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { SITE_URL } from "@/constants";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RayStream International — Lighting Trading & Engineering",
    template: "%s | RayStream International",
  },
  description:
    "RayStream International — global sourcing, lighting audit and professional lighting supply.",
  keywords: [
    "lighting trading",
    "lighting engineering",
    "professional lighting",
    "industrial lighting",
    "architectural lighting",
    "LED lighting",
    "lighting audit",
    "lighting sourcing",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
