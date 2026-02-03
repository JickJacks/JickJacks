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

const tabs = ["Price Alerts", "Wishlist", "Settings"] as const;

type Tab = (typeof tabs)[number];

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
  const [activeTab, setActiveTab] = useState<Tab>("Price Alerts");
  const { wishlistIds, getWishlistGames, removeFromWishlist } = useWishlist();
  const { alerts, addAlert, updateAlert, removeAlert } = usePriceAlerts();
  const { showToast } = useToast();
  const { settings, updateSetting } = useSettings();
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

  const saveSettings = (message = "Impostazioni salvate ✓") => {
    showToast(message);
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

  const notificationFrequencyOptions: Array<{
    value: AppSettings["notificationFrequency"];
    label: string;
  }> = [
    { value: "every_time", label: "Ogni volta" },
    { value: "once_day", label: "Una volta al giorno" },
    { value: "once_week", label: "Una volta a settimana" },
  ];

  const languageOptions: Array<{ value: AppSettings["language"]; label: string }> = [
    { value: "it", label: "Italiano" },
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
  ];

  const handleSave = () => {
    if (!form.gameId || !form.targetPrice) {
      showToast("Seleziona un gioco e inserisci un prezzo target.");
      return;
    }
    if (editingId) {
      updateAlert(editingId, {
        gameId: form.gameId,
        targetPrice: Number(form.targetPrice),
        stores: form.stores,
      });
      showToast("Alert aggiornato ✓");
    } else {
      addAlert({
        gameId: form.gameId,
        targetPrice: Number(form.targetPrice),
        stores: form.stores,
      });
      showToast("Alert creato ✓");
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
            <Heart className="h-4 w-4 text-error" /> {wishlistIds.length} giochi in wishlist
          </div>
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-warning" /> {alerts.length} alert attivi
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                activeTab === tab
                  ? "bg-accent-primary text-white"
                  : "border border-border-color text-text-secondary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === "Price Alerts" ? (
          <button
            className="inline-flex items-center gap-2 rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white"
            onClick={() => openModal()}
          >
            <Plus className="h-4 w-4" /> New Alert
          </button>
        ) : null}
      </div>

      <div className="mt-6 rounded-lg border border-border-color bg-bg-surface/70 p-6">
        {activeTab === "Price Alerts" ? (
          alertsWithData.length === 0 ? (
            <div className="rounded-lg border border-border-color bg-bg-secondary/70 p-8 text-center text-text-secondary">
              <p className="text-base font-semibold text-text-primary">Nessun alert attivo</p>
              <p className="mt-2">
                Aggiungi un alert per essere notificato sui cali di prezzo.
              </p>
              <button
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white"
                onClick={() => openModal()}
              >
                <Plus className="h-4 w-4" /> Aggiungi il primo alert
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
                        Target: €{alert.targetPrice.toFixed(2)} · Attuale: €
                        {currentPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-md border border-border-color px-3 py-1 text-xs text-text-secondary"
                        onClick={() => openModal(alert.id)}
                      >
                        Modifica
                      </button>
                      {confirmDeleteId === alert.id ? (
                        <div className="flex items-center gap-2 text-xs">
                          <span>Sei sicuro?</span>
                          <button
                            className="text-error"
                            onClick={() => {
                              removeAlert(alert.id);
                              setConfirmDeleteId(null);
                              showToast("Alert eliminato");
                            }}
                          >
                            Sì
                          </button>
                          <button
                            className="text-text-secondary"
                            onClick={() => setConfirmDeleteId(null)}
                          >
                            No
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
                      <span>{Math.round(progress)}% del target</span>
                      {withinTarget ? (
                        <span className="text-success">🎉 Prezzo raggiunto!</span>
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

        {activeTab === "Wishlist" ? (
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
              <span className="font-semibold text-text-primary">Sort by:</span>
              <button
                onClick={() => setWishlistSort("name")}
                className={wishlistSort === "name" ? "text-accent-primary" : ""}
              >
                Nome
              </button>
              <button
                onClick={() => setWishlistSort("price-asc")}
                className={wishlistSort === "price-asc" ? "text-accent-primary" : ""}
              >
                Prezzo ↑
              </button>
              <button
                onClick={() => setWishlistSort("price-desc")}
                className={wishlistSort === "price-desc" ? "text-accent-primary" : ""}
              >
                Prezzo ↓
              </button>
              <button
                onClick={() => setWishlistSort("recent")}
                className={wishlistSort === "recent" ? "text-accent-primary" : ""}
              >
                Aggiunto recentemente
              </button>
            </div>
            {wishlistGames.length === 0 ? (
              <div className="rounded-lg border border-border-color bg-bg-secondary/70 p-8 text-center text-text-secondary">
                <p className="text-base font-semibold text-text-primary">La tua wishlist è vuota</p>
                <p className="mt-2">
                  Aggiungi giochi dalla homepage usando il cuore ♥
                </p>
                <Link
                  to="/"
                  className="mt-4 inline-flex rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white"
                >
                  Sfoglia giochi
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
                      aria-label="Remove from wishlist"
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

        {activeTab === "Settings" ? (
          <div className="space-y-8 text-sm text-text-secondary">
            <section className="rounded-lg border border-border-color bg-bg-secondary/70 p-4">
              <h3 className="text-sm font-semibold text-text-primary">Profilo</h3>
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
                    <Camera className="h-3 w-3" /> Cambia foto
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
                    <label className="text-xs font-semibold uppercase text-text-muted">Nome utente</label>
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
                        <Save className="h-3 w-3" /> Salva
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-text-muted">Email</label>
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
              <h3 className="text-sm font-semibold text-text-primary">Notifiche</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-text-primary">Notifiche email</p>
                    <p className="text-xs text-text-secondary">
                      Ricevi notifiche quando un prezzo raggiunge il tuo target
                    </p>
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
                    <p className="font-semibold text-text-primary">Notifica instantanea</p>
                    <p className="text-xs text-text-secondary">Notifiche dirette nel browser</p>
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
                    Frequenza notifiche
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
                    {notificationFrequencyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-border-color bg-bg-secondary/70 p-4">
              <h3 className="text-sm font-semibold text-text-primary">Alert preferences</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-text-muted">
                    Sconto minimo per alert
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
                  <p className="mt-1 text-xs text-text-secondary">
                    Ricevi alert solo se lo sconto supera questa soglia
                  </p>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-text-muted">
                    Prezzo minimo per alert
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
                  <p className="mt-1 text-xs text-text-secondary">
                    Non ricevere alert per giochi sotto questo prezzo
                  </p>
                </div>
                <button
                  className="inline-flex items-center gap-2 rounded-md bg-accent-primary px-3 py-2 text-xs font-semibold text-white"
                  onClick={() => saveSettings()}
                >
                  <Save className="h-3 w-3" /> Salva preferenze
                </button>
              </div>
            </section>

            <section className="rounded-lg border border-border-color bg-bg-secondary/70 p-4">
              <h3 className="text-sm font-semibold text-text-primary">Piattaforme preferite</h3>
              <p className="mt-1 text-xs text-text-secondary">
                Filtra automaticamente i giochi per queste piattaforme
              </p>
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
              <h3 className="text-sm font-semibold text-text-primary">Store preferiti</h3>
              <p className="mt-1 text-xs text-text-secondary">
                Mostra preferenzialmente questi store nei confronti prezzi
              </p>
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
              <h3 className="text-sm font-semibold text-text-primary">Apparenza</h3>
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
                  🌙 Scuro
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
                  ☀️ Chiaro
                </label>
              </div>
              <div className="mt-4">
                <label className="text-xs font-semibold uppercase text-text-muted">Lingua</label>
                <select
                  className="mt-2 w-full rounded-md border border-border-color bg-bg-primary px-3 py-2 text-sm text-text-primary"
                  value={settings.language}
                  onChange={(event) => {
                    updateSetting("language", event.target.value as AppSettings["language"]);
                    saveSettings();
                  }}
                >
                  {languageOptions.map((language) => (
                    <option key={language.value} value={language.value}>
                      {language.label}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <section className="rounded-lg border border-border-color bg-bg-secondary/70 p-4">
              <h3 className="text-sm font-semibold text-text-primary">Account & sicurezza</h3>
              <div className="mt-4 space-y-4">
                <button
                  className="inline-flex items-center gap-2 rounded-md border border-border-color px-3 py-2 text-xs text-text-secondary"
                  onClick={() => setIsPasswordModalOpen(true)}
                >
                  Cambia password
                </button>
                <div className="rounded-md border border-border-color bg-bg-primary/60 p-3 text-xs">
                  <p className="font-semibold text-text-primary">Sessioni attive</p>
                  <p className="mt-2 text-text-secondary">Chrome · Milano · Attiva ora</p>
                  <button className="mt-3 rounded-md border border-border-color px-3 py-2 text-xs text-text-secondary">
                    Disconnetti tutte le altre sessioni
                  </button>
                </div>
                <div className="rounded-md border border-error/50 bg-error/10 p-3 text-xs">
                  <p className="font-semibold text-error">Zona pericolo</p>
                  <p className="mt-1 text-text-secondary">
                    Questa azione non può essere annullata
                  </p>
                  <button
                    className="mt-3 inline-flex items-center gap-2 rounded-md bg-error px-3 py-2 text-xs text-white"
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    <ShieldAlert className="h-3 w-3" /> Elimina account
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
                {editingId ? "Modifica alert" : "Crea nuovo alert"}
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
                <label className="text-xs font-semibold uppercase text-text-muted">Cerca gioco</label>
                <input
                  value={gameSearch}
                  onChange={(event) => setGameSearch(event.target.value)}
                  className="mt-2 w-full rounded-md border border-border-color bg-bg-primary px-3 py-2 text-sm text-text-primary"
                  placeholder="Cerca per titolo..."
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
                <label className="text-xs font-semibold uppercase text-text-muted">Target price</label>
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
                <label className="text-xs font-semibold uppercase text-text-muted">Stores</label>
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
                Cancel
              </button>
              <button
                className="rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white"
                onClick={handleSave}
              >
                Save Alert
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isPasswordModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 animate-fade-in">
          <div className="w-full max-w-md rounded-lg border border-border-color bg-bg-secondary p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Cambia password</h3>
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
                placeholder="Password attuale"
                className="w-full rounded-md border border-border-color bg-bg-primary px-3 py-2 text-text-primary"
              />
              <input
                type="password"
                placeholder="Nuova password"
                className="w-full rounded-md border border-border-color bg-bg-primary px-3 py-2 text-text-primary"
              />
              <input
                type="password"
                placeholder="Conferma nuova password"
                className="w-full rounded-md border border-border-color bg-bg-primary px-3 py-2 text-text-primary"
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-md border border-border-color px-4 py-2 text-sm text-text-secondary"
                onClick={() => setIsPasswordModalOpen(false)}
              >
                Cancella
              </button>
              <button
                className="rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white"
                onClick={() => {
                  showToast("Password aggiornata ✓");
                  setIsPasswordModalOpen(false);
                }}
              >
                Salva
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isDeleteModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 animate-fade-in">
          <div className="w-full max-w-md rounded-lg border border-border-color bg-bg-secondary p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-text-primary">Elimina account</h3>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border-color"
              >
                <X className="h-4 w-4 text-text-secondary" />
              </button>
            </div>
            <p className="mt-4 text-sm text-text-secondary">
              Questa azione non può essere annullata. Sei sicuro di voler eliminare l'account?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-md border border-border-color px-4 py-2 text-sm text-text-secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Annulla
              </button>
              <button
                className="rounded-md bg-error px-4 py-2 text-sm font-semibold text-white"
                onClick={() => {
                  showToast("Account eliminato");
                  setIsDeleteModalOpen(false);
                }}
              >
                Elimina account
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
