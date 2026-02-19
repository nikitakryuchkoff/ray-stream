

import { translations } from './translations';
import type { Lang, Translations } from './types';

export const LOCALES: Lang[] = ['ru', 'en'];
export const DEFAULT_LOCALE: Lang = 'ru';

export function getTranslations(lang: Lang): Translations {
  return translations[lang] ?? translations[DEFAULT_LOCALE];
}

export function isValidLocale(lang: string): lang is Lang {
  return LOCALES.includes(lang as Lang);
}
