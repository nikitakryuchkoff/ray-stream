export const SITE_URL = "https://raystream.com";

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RayStream International Limited",
  url: SITE_URL,
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
