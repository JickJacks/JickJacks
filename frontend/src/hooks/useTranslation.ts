// src/hooks/useTranslation.ts
import { useSettings } from "../context/SettingsContext";
import { translations, type TranslationKey } from "../i18n/translations";

export function useTranslation() {
  const { settings } = useSettings();

  const t = (key: TranslationKey): string => {
    const entry = translations[key];
    if (!entry) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return entry[settings.language] ?? entry.it;
  };

  return { t };
}
