import { createContext, useContext, useEffect, useState } from "react";

export type AppSettings = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  notificationFrequency: "every_time" | "once_day" | "once_week";
  minimumDiscount: number;
  minimumAlertPrice: number;
  preferredPlatforms: string[];
  preferredStores: string[];
  theme: "dark" | "light";
  language: "it" | "en" | "es" | "fr";
};

const DEFAULT_SETTINGS: AppSettings = {
  emailNotifications: true,
  pushNotifications: false,
  notificationFrequency: "every_time",
  minimumDiscount: 13,
  minimumAlertPrice: 0,
  preferredPlatforms: ["PC", "PlayStation 5"],
  preferredStores: ["Instant Gaming", "Eneba"],
  theme: "dark",
  language: "it",
};

const STORAGE_KEY = "jickjacks_settings";
const LANGUAGE_MAP: Record<string, AppSettings["language"]> = {
  Italiano: "it",
  English: "en",
  Español: "es",
  Français: "fr",
};

const LANGUAGE_OPTIONS: AppSettings["language"][] = ["it", "en", "es", "fr"];

function normalizeLanguage(value: unknown): AppSettings["language"] {
  if (typeof value === "string") {
    if (LANGUAGE_OPTIONS.includes(value as AppSettings["language"])) {
      return value as AppSettings["language"];
    }
    const mapped = LANGUAGE_MAP[value];
    if (mapped) {
      return mapped;
    }
  }
  return DEFAULT_SETTINGS.language;
}

function loadSettings(): AppSettings {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_SETTINGS, ...parsed, language: normalizeLanguage(parsed?.language) };
    }
  } catch (error) {
    console.error("Failed to load settings", error);
  }
  return DEFAULT_SETTINGS;
}

function saveSettings(settings: AppSettings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save settings", error);
  }
}

type SettingsContextType = {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  updateSettings: (partial: Partial<AppSettings>) => void;
  resetSettings: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);

  useEffect(() => {
    const html = document.documentElement;
    if (settings.theme === "light") {
      html.classList.add("light");
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
      html.classList.remove("light");
    }
  }, [settings.theme]);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updateSettings = (partial: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }
  return context;
}
