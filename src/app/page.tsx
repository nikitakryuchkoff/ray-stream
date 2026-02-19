import { content } from "@/content/en";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import Advantages from "@/components/Advantages/Advantages";
import Geography from "@/components/Geography/Geography";
import Partners from "@/components/Partners/Partners";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RayStream International Limited",
  url: "https://raystream.com",
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
};

export default function RootPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Header t={content} />
      <main>
        <Hero t={content} />
        <About t={content} />
        <Services t={content} />
        <Advantages t={content} />
        <Geography t={content} />
        <Partners t={content} />
        <Contact t={content} />
      </main>
      <Footer t={content} />
    </>
  );
}
