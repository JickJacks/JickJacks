import { useEffect, useState } from "react";
import { createAlert, deleteAlert, fetchAlerts } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { mapApiGameToGame } from "../utils/mapApiGame";

export type PriceAlert = {
  id: number;
  gameId: number;
  targetPrice: number;
  status: "pending" | "triggered";
  createdAt: string;
  updatedAt: string;
  gameTitle: string;
  gameCover: string;
  gamePrice: number;
};

export default function usePriceAlerts() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    let isActive = true;
    if (!token) {
      setAlerts([]);
      return () => {
        isActive = false;
      };
    }
    fetchAlerts(token)
      .then((items) => {
        if (!isActive) return;
        const mapped = items.map((item) => {
          const game = mapApiGameToGame(item.game, "Best price");
          return {
            id: item.id,
            gameId: item.gameId,
            targetPrice: item.targetPrice,
            status: item.status,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            gameTitle: game.title,
            gameCover: game.coverImage,
            gamePrice: game.prices[0]?.price ?? 0,
          };
        });
        setAlerts(mapped);
      })
      .catch((error) => {
        console.warn("Failed to load alerts.", error);
      });
    return () => {
      isActive = false;
    };
  }, [token]);

  const addAlert = async (alert: { gameId: number; targetPrice: number }) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    const created = await createAlert(token, alert.gameId, alert.targetPrice);
    const game = mapApiGameToGame(created.game, "Best price");
    setAlerts((prev) => [
      {
        id: created.id,
        gameId: created.gameId,
        targetPrice: created.targetPrice,
        status: created.status,
        createdAt: created.createdAt,
        updatedAt: created.updatedAt,
        gameTitle: game.title,
        gameCover: game.coverImage,
        gamePrice: game.prices[0]?.price ?? 0,
      },
      ...prev,
    ]);
  };

  const removeAlert = async (id: number) => {
    if (!token) {
      throw new Error("Not authenticated");
    }
    await deleteAlert(token, id);
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return {
    alerts,
    addAlert,
    removeAlert,
  };
}
