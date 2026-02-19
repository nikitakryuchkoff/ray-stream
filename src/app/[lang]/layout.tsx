import { notFound } from 'next/navigation';
import { isValidLocale, LOCALES } from '@/i18n/helpers';
import type { Lang } from '@/i18n/types';
import type { Metadata } from 'next';
import HtmlLangSetter from './HtmlLangSetter';

const SITE_URL = 'https://raystream.com';

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = params.lang as Lang;
  const isRu = lang === 'ru';

  return {
    title: isRu
      ? 'RayStream International — Трейдинг и инжиниринг профессионального освещения'
      : 'RayStream International — Lighting Trading & Engineering',
    description: isRu
      ? 'RayStream International — глобальный сорсинг, светотехнический аудит и поставка профессионального освещения из Китая, Европы и Азии.'
      : 'RayStream International — global sourcing, lighting audit and professional lighting supply from Asia & Europe.',
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: { ru: `${SITE_URL}/ru`, en: `${SITE_URL}/en` },
    },
    openGraph: {
      locale: isRu ? 'ru_RU' : 'en_US',
      alternateLocale: isRu ? ['en_US'] : ['ru_RU'],
      url: `${SITE_URL}/${lang}`,
      siteName: 'RayStream International',
      title: isRu
        ? 'RayStream International — Трейдинг и инжиниринг профессионального освещения'
        : 'RayStream International — Lighting Trading & Engineering',
      description: isRu
        ? 'Глобальный сорсинг, светотехнический аудит и поставка профессионального освещения.'
        : 'Global sourcing, lighting audit and professional lighting supply.',
    },
    twitter: {
      card: 'summary_large_image',
      title: isRu
        ? 'RayStream International — Профессиональное освещение'
        : 'RayStream International — Lighting Trading & Engineering',
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isValidLocale(params.lang)) notFound();

  return (
    <>
      <HtmlLangSetter lang={params.lang} />
      {children}
    </>
  );
}
