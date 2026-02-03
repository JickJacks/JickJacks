import {
  Bell,
  Camera,
  Heart,
  Plus,
  Save,
  ShieldAlert,
  Trash2,
  UserCircle,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { gamesData } from "../data/gamesData";
import { useWishlist } from "../context/WishlistContext";
import usePriceAlerts from "../hooks/usePriceAlerts";
import { useToast } from "../components/Toast";
import { type AppSettings, useSettings } from "../context/SettingsContext";
import { useTranslation } from "../hooks/useTranslation";

const tabs = [
  { key: "price_alerts", labelKey: "tab_price_alerts" },
  { key: "wishlist", labelKey: "tab_wishlist" },
  { key: "settings", labelKey: "tab_settings" },
] as const;

type Tab = (typeof tabs)[number]["key"];

type AlertFormState = {
  gameId: string;
  targetPrice: string;
  stores: string[];
};

const initialForm: AlertFormState = {
  gameId: "",
  targetPrice: "",
  stores: [],
};

type ProfileDetails = {
  avatar: string;
  username: string;
  email: string;
};

const PROFILE_KEY = "profileSettings";

const defaultProfileDetails: ProfileDetails = {
  avatar: "",
  username: "GameHunter_IT",
  email: "utente@gamedeals.it",
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("price_alerts");
  const { wishlistIds, getWishlistGames, removeFromWishlist } = useWishlist();
  const { alerts, addAlert, updateAlert, removeAlert } = usePriceAlerts();
  const { showToast } = useToast();
  const { settings, updateSetting } = useSettings();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [wishlistSort, setWishlistSort] = useState("recent");
  const [form, setForm] = useState<AlertFormState>(initialForm);
  const [gameSearch, setGameSearch] = useState("");
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>(() => {
    try {
      const stored = window.localStorage.getItem(PROFILE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultProfileDetails, ...parsed };
      }
    } catch (error) {
      console.error("Failed to load profile settings", error);
    }
    return defaultProfileDetails;
  });
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profileDetails));
    } catch (error) {
      console.error("Failed to save profile settings", error);
    }
  }, [profileDetails]);

  const storeOptions = useMemo(() => {
    const set = new Set<string>();
    gamesData.forEach((game) => {
      game.prices.forEach((price) => set.add(price.store));
    });
    return Array.from(set).sort();
  }, []);

  const filteredGames = useMemo(() => {
    const term = gameSearch.trim().toLowerCase();
    if (!term) {
      return gamesData;
    }
    return gamesData.filter((game) => game.title.toLowerCase().includes(term));
  }, [gameSearch]);

  const openModal = (alertId?: string) => {
    if (alertId) {
      const alert = alerts.find((item) => item.id === alertId);
      if (alert) {
        setEditingId(alert.id);
        setForm({
          gameId: alert.gameId,
          targetPrice: alert.targetPrice.toString(),
          stores: alert.stores,
        });
      }
    } else {
      setEditingId(null);
      setForm(initialForm);
    }
    setGameSearch("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(initialForm);
  };

  const saveSettings = (message?: string) => {
    showToast(message ?? t("settings_saved_toast"));
  };

  const handleAvatarChange = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileDetails((prev) => ({ ...prev, avatar: String(reader.result) }));
      saveSettings();
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.gameId || !form.targetPrice) {
      showToast(t("modal_select_game_and_price"));
      return;
    }
    if (editingId) {
      updateAlert(editingId, {
        gameId: form.gameId,
        targetPrice: Number(form.targetPrice),
        stores: form.stores,
      });
      showToast(t("modal_alert_updated_toast"));
    } else {
      addAlert({
        gameId: form.gameId,
        targetPrice: Number(form.targetPrice),
        stores: form.stores,
      });
      showToast(t("modal_alert_created_toast"));
    }
    closeModal();
  };

  const alertsWithData = alerts.map((alert) => {
    const game = gamesData.find((item) => item.id === alert.gameId);
    const currentPrice = game ? Math.min(...game.prices.map((price) => price.price)) : 0;
    const progress = currentPrice
      ? Math.min((alert.targetPrice / currentPrice) * 100, 100)
      : 0;
    const withinTarget = currentPrice > 0 && currentPrice <= alert.targetPrice;
    const closeToTarget = currentPrice > 0 && currentPrice <= alert.targetPrice * 1.2;
    return { alert, game, currentPrice, progress, withinTarget, closeToTarget };
  });

  const wishlistGames = useMemo(() => {
    const games = getWishlistGames();
    const withPrice = games.map((game) => ({
      game,
      bestPrice: Math.min(...game.prices.map((price) => price.price)),
    }));
    switch (wishlistSort) {
      case "name":
        return withPrice.sort((a, b) => a.game.title.localeCompare(b.game.title));
      case "price-asc":
        return withPrice.sort((a, b) => a.bestPrice - b.bestPrice);
      case "price-desc":
        return withPrice.sort((a, b) => b.bestPrice - a.bestPrice);
      case "recent":
      default:
        return withPrice.sort(
          (a, b) => wishlistIds.indexOf(b.game.id) - wishlistIds.indexOf(a.game.id)
        );
    }
  }, [getWishlistGames, wishlistIds, wishlistSort]);

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-10">
      <div className="rounded-lg border border-border-color bg-bg-surface/80 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <UserCircle className="h-16 w-16 text-accent-primary" />
          <div>
            <h1 className="text-2xl font-semibold">{profileDetails.username}</h1>
            <p className="text-sm text-text-secondary">{profileDetails.email}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-6 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-error" /> {wishlistIds.length} {t("profile_games_in_wishlist")}
          </div>
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-warning" /> {alerts.length} {t("profile_active_alerts")}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                activeTab === tab.key
                  ? "bg-accent-primary text-white"
                  : "border border-border-color text-text-secondary"
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>
        {activeTab === "price_alerts" ? (
          <button
            className="inline-flex items-center gap-2 rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white"
            onClick={() => openModal()}
          >
            <Plus className="h-4 w-4" /> {t("alerts_new_alert")}
          </button>
        ) : null}
      </div>

      <div className="mt-6 rounded-lg border border-border-color bg-bg-surface/70 p-6">
        {activeTab === "price_alerts" ? (
          alertsWithData.length === 0 ? (
            <div className="rounded-lg border border-border-color bg-bg-secondary/70 p-8 text-center text-text-secondary">
              <p className="text-base font-semibold text-text-primary">{t("alerts_empty_title")}</p>
              <p className="mt-2">{t("alerts_empty_subtitle")}</p>
              <button
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white"
                onClick={() => openModal()}
              >
                <Plus className="h-4 w-4" /> {t("alerts_add_first")}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {alertsWithData.map(({ alert, game, currentPrice, progress, withinTarget, closeToTarget }) => (
                <div
                  key={alert.id}
                  className="rounded-lg border border-border-color bg-bg-secondary/70 p-4"
                >
                  <div className="flex flex-wrap items-center gap-4">
                    {game ? (
                      <img
                        src={game.coverImage}
                        alt={game.title}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                    ) : null}
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-text-primary">{game?.title}</p>
                      <p className="mt-1 text-xs text-text-secondary">
                        {t("alerts_target")} €{alert.targetPrice.toFixed(2)} · {t("alerts_current")} €
                        {currentPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-md border border-border-color px-3 py-1 text-xs text-text-secondary"
                        onClick={() => openModal(alert.id)}
                      >
                        {t("alerts_edit")}
                      </button>
                      {confirmDeleteId === alert.id ? (
                        <div className="flex items-center gap-2 text-xs">
                          <span>{t("alerts_are_you_sure")}</span>
                          <button
                            className="text-error"
                            onClick={() => {
                              removeAlert(alert.id);
                              setConfirmDeleteId(null);
                              showToast(t("alerts_deleted_toast"));
                            }}
                          >
                            {t("alerts_yes")}
                          </button>
                          <button
                            className="text-text-secondary"
                            onClick={() => setConfirmDeleteId(null)}
                          >
                            {t("alerts_no")}
                          </button>
                        </div>
                      ) : (
                        <button
                          className="rounded-md border border-border-color px-3 py-1 text-xs text-text-secondary"
                          onClick={() => setConfirmDeleteId(alert.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>{Math.round(progress)}{t("alerts_percent_of_target")}</span>
                      {withinTarget ? (
                        <span className="text-success">{t("alerts_price_reached")}</span>
                      ) : null}
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-bg-primary">
                      <div
                        className={`h-2 rounded-full ${
                          withinTarget
                            ? "bg-success"
                            : closeToTarget
                              ? "bg-warning"
                              : "bg-border-hover"
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : null}

        {activeTab === "wishlist" ? (
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
              <span className="font-semibold text-text-primary">{t("wishlist_sort_by")}</span>
              <button
                onClick={() => setWishlistSort("name")}
                className={wishlistSort === "name" ? "text-accent-primary" : ""}
              >
                {t("wishlist_sort_name")}
              </button>
              <button
                onClick={() => setWishlistSort("price-asc")}
                className={wishlistSort === "price-asc" ? "text-accent-primary" : ""}
              >
                {t("wishlist_sort_price_asc")}
              </button>
              <button
                onClick={() => setWishlistSort("price-desc")}
                className={wishlistSort === "price-desc" ? "text-accent-primary" : ""}
              >
                {t("wishlist_sort_price_desc")}
              </button>
              <button
                onClick={() => setWishlistSort("recent")}
                className={wishlistSort === "recent" ? "text-accent-primary" : ""}
              >
                {t("wishlist_sort_recent")}
              </button>
            </div>
            {wishlistGames.length === 0 ? (
              <div className="rounded-lg border border-border-color bg-bg-secondary/70 p-8 text-center text-text-secondary">
                <p className="text-base font-semibold text-text-primary">{t("wishlist_empty_title")}</p>
                <p className="mt-2">{t("wishlist_empty_subtitle")}</p>
                <Link
                  to="/"
                  className="mt-4 inline-flex rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white"
                >
                  {t("wishlist_browse_games")}
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {wishlistGames.map(({ game, bestPrice }) => (
                  <Link
                    key={game.id}
                    to={`/game/${game.id}`}
                    className="group relative rounded-md border border-border-color bg-bg-secondary/70 p-3 transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        removeFromWishlist(game.id);
                      }}
                      className="absolute right-3 top-3 rounded-full border border-border-color bg-bg-primary/80 p-1 text-text-secondary opacity-0 transition group-hover:opacity-100"
                      aria-label={t("wishlist_remove_label")}
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <img
                      src={game.coverImage}
                      alt={game.title}
                      className="h-40 w-full rounded-md object-cover"
                    />
                    <p className="mt-3 text-sm font-semibold text-text-primary">{game.title}</p>
                    <p className="text-xs text-success">€{bestPrice.toFixed(2)}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {game.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="rounded-full border border-border-color px-2 py-1 text-xs text-text-secondary"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {activeTab === "settings" ? (
          <div className="space-y-8 text-sm text-text-secondary">
            <section className="rounded-lg border border-border-color bg-bg-secondary/70 p-4">
              <h3 className="text-sm font-semibold text-text-primary">{t("settings_profile")}</h3>
              <div className="mt-4 flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border-color">
                    {profileDetails.avatar ? (
                      <img
                        src={profileDetails.avatar}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserCircle className="h-full w-full text-text-muted" />
                    )}
                  </div>
                  <label className="flex cursor-pointer items-center gap-2 text-xs text-accent-primary">
                    <Camera className="h-3 w-3" /> {t("settings_change_photo")}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => handleAvatarChange(event.target.files?.[0])}
                    />
                  </label>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="text-xs font-semibold uppercase text-text-muted">{t("settings_username")}</label>
                    <div className="mt-2 flex gap-2">
                      <input
                        value={profileDetails.username}
                        onChange={(event) =>
                          setProfileDetails((prev) => ({ ...prev, username: event.target.value }))
                        }
                        className="w-full rounded-md border border-border-color bg-bg-primary px-3 py-2 text-sm text-text-primary"
                      />
                      <button
                        className="inline-flex items-center gap-2 rounded-md bg-accent-primary px-3 py-2 text-xs font-semibold text-white"
                        onClick={() => saveSettings()}
                      >
                        <Save className="h-3 w-3" /> {t("settings_save")}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-text-muted">{t("settings_email")}</label>
                    <input
                      value={profileDetails.email}
                      onChange={(event) =>
                        setProfileDetails((prev) => ({ ...prev, email: event.target.value }))
                      }
                      className="mt-2 w-full rounded-md border border-border-color bg-bg-primary px-3 py-2 text-sm text-text-primary"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-border-color bg-bg-secondary/70 p-4">
              <h3 className="text-sm font-semibold text-text-primary">{t("settings_notifications")}</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-text-primary">{t("settings_email_notifications")}</p>
                    <p className="text-xs text-text-secondary">{t("settings_email_notifications_desc")}</p>
                  </div>
                  <button
                    className={`h-6 w-12 rounded-full p-1 transition ${
                      settings.emailNotifications ? "bg-success" : "bg-border-color"
                    }`}
                    onClick={() => {
                      updateSetting("emailNotifications", !settings.emailNotifications);
                      saveSettings();
                    }}
                    aria-label="Toggle email notifications"
                  >
                    <span
                      className={`block h-4 w-4 rounded-full bg-white transition ${
                        settings.emailNotifications ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-text-primary">{t("settings_push_notifications")}</p>
                    <p className="text-xs text-text-secondary">{t("settings_push_notifications_desc")}</p>
                  </div>
                  <button
                    className={`h-6 w-12 rounded-full p-1 transition ${
                      settings.pushNotifications ? "bg-success" : "bg-border-color"
                    }`}
                    onClick={() => {
                      updateSetting("pushNotifications", !settings.pushNotifications);
                      saveSettings();
                    }}
                    aria-label="Toggle push notifications"
                  >
                    <span
                      className={`block h-4 w-4 rounded-full bg-white transition ${
                        settings.pushNotifications ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-text-muted">
                    {t("settings_notification_frequency")}
                  </label>
                  <select
                    className="mt-2 w-full rounded-md border border-border-color bg-bg-primary px-3 py-2 text-sm text-text-primary"
                    value={settings.notificationFrequency}
                    onChange={(event) => {
                      updateSetting(
                        "notificationFrequency",
                        event.target.value as AppSettings["notificationFrequency"]
                      );
                      saveSettings();
                    }}
                  >
                    <option value="every_time">{t("settings_freq_every_time")}</option>
                    <option value="once_day">{t("settings_freq_once_day")}</option>
                    <option value="once_week">{t("settings_freq_once_week")}</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-border-color bg-bg-secondary/70 p-4">
              <h3 className="text-sm font-semibold text-text-primary">{t("settings_alert_preferences")}</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-text-muted">
                    {t("settings_min_discount")}
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="range"
                      min={5}
                      max={80}
                      value={settings.minimumDiscount}
                      onChange={(event) =>
                        updateSetting("minimumDiscount", Number(event.target.value))
                      }
                      className="w-full"
                    />
                    <span className="text-xs font-semibold text-text-primary">
                      {settings.minimumDiscount}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">{t("settings_min_discount_desc")}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-text-muted">
                    {t("settings_min_price")}
                  </label>
                  <div className="mt-2 flex items-center gap-2 rounded-md border border-border-color bg-bg-primary px-3 py-2">
                    <span className="text-text-secondary">€</span>
                    <input
                      type="number"
                      min={0}
                      value={settings.minimumAlertPrice}
                      onChange={(event) =>
                        updateSetting("minimumAlertPrice", Number(event.target.value))
                      }
                      className="w-full bg-transparent text-sm text-text-primary focus:outline-none"
                    />
                  </div>
                  <p className="mt-1 text-xs text-text-secondary">{t("settings_min_price_desc")}</p>
                </div>
                <button
                  className="inline-flex items-center gap-2 rounded-md bg-accent-primary px-3 py-2 text-xs font-semibold text-white"
                  onClick={() => saveSettings()}
                >
                  <Save className="h-3 w-3" /> {t("settings_save_preferences")}
                </button>
              </div>
            </section>

            <section className="rounded-lg border border-border-color bg-bg-secondary/70 p-4">
              <h3 className="text-sm font-semibold text-text-primary">{t("settings_preferred_platforms")}</h3>
              <p className="mt-1 text-xs text-text-secondary">{t("settings_preferred_platforms_desc")}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {[
                  "PC",
                  "PlayStation 5",
                  "PlayStation 4",
                  "Xbox Series X|S",
                  "Xbox One",
                  "Nintendo Switch",
                ].map((platform) => (
                  <label key={platform} className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={settings.preferredPlatforms.includes(platform)}
                      onChange={() => {
                        updateSetting(
                          "preferredPlatforms",
                          settings.preferredPlatforms.includes(platform)
                            ? settings.preferredPlatforms.filter((item) => item !== platform)
                            : [...settings.preferredPlatforms, platform]
                        );
                        saveSettings();
                      }}
                      className="h-4 w-4"
                    />
                    {platform}
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-border-color bg-bg-secondary/70 p-4">
              <h3 className="text-sm font-semibold text-text-primary">{t("settings_preferred_stores")}</h3>
              <p className="mt-1 text-xs text-text-secondary">{t("settings_preferred_stores_desc")}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {[
                  "Instant Gaming",
                  "Eneba",
                  "Steam",
                  "Epic Games",
                  "GOG",
                  "Amazon",
                  "G2A",
                ].map((store) => (
                  <label key={store} className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={settings.preferredStores.includes(store)}
                      onChange={() => {
                        updateSetting(
                          "preferredStores",
                          settings.preferredStores.includes(store)
                            ? settings.preferredStores.filter((item) => item !== store)
                            : [...settings.preferredStores, store]
                        );
                        saveSettings();
                      }}
                      className="h-4 w-4"
                    />
                    {store}
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-border-color bg-bg-secondary/70 p-4">
              <h3 className="text-sm font-semibold text-text-primary">{t("settings_appearance")}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="theme"
                    checked={settings.theme === "dark"}
                    onChange={() => {
                      updateSetting("theme", "dark");
                      saveSettings();
                    }}
                  />
                  {t("settings_dark")}
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="theme"
                    checked={settings.theme === "light"}
                    onChange={() => {
                      updateSetting("theme", "light");
                      saveSettings();
                    }}
                  />
                  {t("settings_light")}
                </label>
              </div>
              <div className="mt-4">
                <label className="text-xs font-semibold uppercase text-text-muted">{t("settings_language")}</label>
                <select
                  className="mt-2 w-full rounded-md border border-border-color bg-bg-primary px-3 py-2 text-sm text-text-primary"
                  value={settings.language}
                  onChange={(event) => {
                    updateSetting("language", event.target.value as AppSettings["language"]);
                    saveSettings();
                  }}
                >
                  <option value="it">Italiano</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </section>

            <section className="rounded-lg border border-border-color bg-bg-secondary/70 p-4">
              <h3 className="text-sm font-semibold text-text-primary">{t("settings_account_security")}</h3>
              <div className="mt-4 space-y-4">
                <button
                  className="inline-flex items-center gap-2 rounded-md border border-border-color px-3 py-2 text-xs text-text-secondary"
                  onClick={() => setIsPasswordModalOpen(true)}
                >
                  {t("settings_change_password")}
                </button>
                <div className="rounded-md border border-border-color bg-bg-primary/60 p-3 text-xs">
                  <p className="font-semibold text-text-primary">{t("settings_active_sessions")}</p>
                  <p className="mt-2 text-text-secondary">{t("settings_active_session_detail")}</p>
                  <button className="mt-3 rounded-md border border-border-color px-3 py-2 text-xs text-text-secondary">
                    {t("settings_disconnect_sessions")}
                  </button>
                </div>
                <div className="rounded-md border border-error/50 bg-error/10 p-3 text-xs">
                  <p className="font-semibold text-error">{t("settings_danger_zone")}</p>
                  <p className="mt-1 text-text-secondary">{t("settings_danger_zone_desc")}</p>
                  <button
                    className="mt-3 inline-flex items-center gap-2 rounded-md bg-error px-3 py-2 text-xs text-white"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    <ShieldAlert className="h-3 w-3" /> {t("settings_delete_account")}
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : null}
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-lg border border-border-color bg-bg-secondary p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">
                {editingId ? t("modal_edit_alert") : t("modal_create_alert")}
              </h3>
              <button
                onClick={closeModal}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border-color"
              >
                <X className="h-4 w-4 text-text-secondary" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-text-muted">{t("modal_search_game")}</label>
                <input
                  value={gameSearch}
                  onChange={(event) => setGameSearch(event.target.value)}
                  className="mt-2 w-full rounded-md border border-border-color bg-bg-primary px-3 py-2 text-sm text-text-primary"
                  placeholder={t("modal_search_by_title")}
                />
                <div className="mt-3 max-h-40 space-y-2 overflow-y-auto">
                  {filteredGames.map((game) => (
                    <button
                      key={game.id}
                      className={`flex w-full items-center gap-3 rounded-md border px-3 py-2 text-left text-sm ${
                        form.gameId === game.id
                          ? "border-accent-primary bg-accent-primary/20"
                          : "border-border-color"
                      }`}
                      onClick={() => setForm((prev) => ({ ...prev, gameId: game.id }))}
                    >
                      <img
                        src={game.coverImage}
                        alt={game.title}
                        className="h-8 w-8 rounded-md object-cover"
                      />
                      {game.title}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-text-muted">{t("modal_target_price")}</label>
                <div className="mt-2 flex items-center gap-2 rounded-md border border-border-color bg-bg-primary px-3 py-2">
                  <span className="text-text-secondary">€</span>
                  <input
                    type="number"
                    min={0}
                    value={form.targetPrice}
                    onChange={(event) => setForm((prev) => ({ ...prev, targetPrice: event.target.value }))}
                    className="w-full bg-transparent text-sm text-text-primary focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-text-muted">{t("modal_stores")}</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {storeOptions.map((store) => (
                    <label
                      key={store}
                      className={`rounded-full border px-3 py-1 text-xs ${
                        form.stores.includes(store)
                          ? "border-accent-primary bg-accent-primary/20 text-accent-primary"
                          : "border-border-color text-text-secondary"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={form.stores.includes(store)}
                        onChange={() =>
                          setForm((prev) => ({
                            ...prev,
                            stores: prev.stores.includes(store)
                              ? prev.stores.filter((item) => item !== store)
                              : [...prev.stores, store],
                          }))
                        }
                      />
                      {store}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-md border border-border-color px-4 py-2 text-sm text-text-secondary"
                onClick={closeModal}
              >
                {t("modal_cancel")}
              </button>
              <button
                className="rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white"
                onClick={handleSave}
              >
                {t("modal_save_alert")}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isPasswordModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 animate-fade-in">
          <div className="w-full max-w-md rounded-lg border border-border-color bg-bg-secondary p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">{t("settings_change_password")}</h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border-color"
              >
                <X className="h-4 w-4 text-text-secondary" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <input
                type="password"
                placeholder={t("password_current")}
                className="w-full rounded-md border border-border-color bg-bg-primary px-3 py-2 text-text-primary"
              />
              <input
                type="password"
                placeholder={t("password_new")}
                className="w-full rounded-md border border-border-color bg-bg-primary px-3 py-2 text-text-primary"
              />
              <input
                type="password"
                placeholder={t("password_confirm")}
                className="w-full rounded-md border border-border-color bg-bg-primary px-3 py-2 text-text-primary"
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-md border border-border-color px-4 py-2 text-sm text-text-secondary"
                onClick={() => setIsPasswordModalOpen(false)}
              >
                {t("password_cancel")}
              </button>
              <button
                className="rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white"
                onClick={() => {
                  showToast(t("password_updated_toast"));
                  setIsPasswordModalOpen(false);
                }}
              >
                {t("settings_save")}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isDeleteModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 animate-fade-in">
          <div className="w-full max-w-md rounded-lg border border-border-color bg-bg-secondary p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">{t("settings_delete_account")}</h3>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border-color"
              >
                <X className="h-4 w-4 text-text-secondary" />
              </button>
            </div>
            <p className="mt-4 text-sm text-text-secondary">
              {t("delete_sure")}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-md border border-border-color px-4 py-2 text-sm text-text-secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                {t("delete_annulla")}
              </button>
              <button
                className="rounded-md bg-error px-4 py-2 text-sm font-semibold text-white"
                onClick={() => {
                  showToast(t("delete_account_toast"));
                  setIsDeleteModalOpen(false);
                }}
              >
                {t("settings_delete_account")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
