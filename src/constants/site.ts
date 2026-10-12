export const SITE_URL = "https://raystream.hk/";
export const SITE_EMAIL = "info@raystream.hk";

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RayStream International Limited",
  url: SITE_URL,
  email: SITE_EMAIL,
  description:
    "Global sourcing, lighting audit and professional lighting supply from Asia & Europe.",
  areaServed: ["CN", "AE", "TR", "UZ", "KZ", "HK"],
  knowsAbout: [
    "Professional lighting",
    "Lighting engineering",
    "LED technology",
    "Lighting audit",
    "Industrial lighting",
    "Architectural lighting",
  ],
} as const;
