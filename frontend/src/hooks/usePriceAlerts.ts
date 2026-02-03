import { useEffect, useState } from "react";

export type PriceAlert = {
  id: string;
  gameId: string;
  targetPrice: number;
  stores: string[];
  createdAt: string;
};

const STORAGE_KEY = "priceAlerts";

export default function usePriceAlerts() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAlerts(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
  }, [alerts]);

  const addAlert = (alert: Omit<PriceAlert, "id" | "createdAt">) => {
    setAlerts((prev) => [
      ...prev,
      {
        ...alert,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const updateAlert = (id: string, updates: Partial<Omit<PriceAlert, "id">>) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, ...updates } : alert)));
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return {
    alerts,
    addAlert,
    updateAlert,
    removeAlert,
  };
}
