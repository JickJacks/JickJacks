import { useState } from "react";
import { Bell, Settings, UserCircle } from "lucide-react";
import { topDeals } from "../data/games";

const tabs = ["Price Alerts", "Wishlist", "Settings"] as const;

type Tab = (typeof tabs)[number];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Price Alerts");

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="mx-auto max-w-[1100px] px-4 py-10">
        <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border-color bg-bg-surface/80 p-6">
          <UserCircle className="h-16 w-16 text-accent-primary" />
          <div>
            <h1 className="text-2xl font-semibold">GameHunter_IT</h1>
            <p className="text-sm text-text-secondary">utente@gamedeals.it</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
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

        <div className="mt-6 rounded-lg border border-border-color bg-bg-surface/70 p-6">
          {activeTab === "Price Alerts" ? (
            <div className="space-y-4">
              {topDeals.slice(0, 3).map((deal) => (
                <div
                  key={deal.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border-color bg-bg-secondary/70 p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{deal.title}</p>
                    <p className="text-xs text-text-secondary">
                      Target: €{(deal.currentPrice - 5).toFixed(2)} · Prezzo attuale: €
                      {deal.currentPrice.toFixed(2)}
                    </p>
                  </div>
                  <button className="rounded-md border border-border-color px-3 py-1 text-xs text-text-secondary">
                    Modifica
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === "Wishlist" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topDeals.slice(0, 6).map((deal) => (
                <div
                  key={deal.id}
                  className="rounded-md border border-border-color bg-bg-secondary/70 p-3"
                >
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="h-32 w-full rounded-md object-cover"
                  />
                  <p className="mt-2 text-sm font-semibold text-text-primary">{deal.title}</p>
                  <p className="text-xs text-success">€{deal.currentPrice.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === "Settings" ? (
            <div className="space-y-4 text-sm text-text-secondary">
              <div className="flex items-center gap-3">
                <Settings className="h-4 w-4 text-accent-primary" />
                Notifiche email: attive
              </div>
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-warning" />
                Sconto minimo alert: 50%
              </div>
              <div>
                Piattaforme preferite: PC, PlayStation 5
              </div>
              <div>
                Store preferiti: Instant Gaming, Eneba
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
