
import type { Locale } from "./types"

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  fr: () => import("../dictionaries/fr.json").then((module) => module.default),
  ar: () => import("../dictionaries/ar.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  // Make sure locale is one of the supported locales
  const validLocale = (Object.keys(dictionaries) as Locale[]).includes(locale) ? locale : "en"

  try {
    return await dictionaries[validLocale]()
  } catch (error) {
    console.error(`Error loading dictionary for locale: ${validLocale}`, error)
    // Fallback to English if there's an error
    return await dictionaries.en()
  }
}
