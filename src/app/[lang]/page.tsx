import { getTranslations } from '@/i18n/helpers';
import type { Lang } from '@/i18n/types';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Advantages from '@/components/Advantages/Advantages';
import Geography from '@/components/Geography/Geography';
import Partners from '@/components/Partners/Partners';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RayStream International Limited',
  url: 'https://raystream.com',
  description:
    'Глобальный сорсинг, светотехнический аудит и поставка профессионального освещения из Китая, Европы и Азии.',
  areaServed: ['CN', 'AE', 'TR', 'UZ', 'KZ', 'HK'],
  knowsAbout: [
    'Professional lighting',
    'Lighting engineering',
    'LED technology',
    'Lighting audit',
    'Industrial lighting',
    'Architectural lighting',
  ],
};

export default function Home({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang;
  const t = getTranslations(lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Header lang={lang} t={t} />
      <main>
        <Hero lang={lang} t={t} />
        <About t={t} />
        <Services t={t} />
        <Advantages t={t} />
        <Geography t={t} />
        <Partners t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
