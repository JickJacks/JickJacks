import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { gamesData } from "../data/gamesData";
import type { Game } from "../types/game";
import { useToast } from "./ToastContext";

const STORAGE_KEY = "wishlist";

type WishlistContextValue = {
  wishlistIds: string[];
  addToWishlist: (gameId: string) => void;
  removeFromWishlist: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;
  getWishlistGames: () => Game[];
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setWishlistIds(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const addToWishlist = (gameId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(gameId)) {
        return prev;
      }
      showToast("Added to wishlist!");
      return [...prev, gameId];
    });
  };

  const removeFromWishlist = (gameId: string) => {
    setWishlistIds((prev) => {
      if (!prev.includes(gameId)) {
        return prev;
      }
      showToast("Removed from wishlist!");
      return prev.filter((id) => id !== gameId);
    });
  };

  const isInWishlist = (gameId: string) => wishlistIds.includes(gameId);

  const wishlistGames = useMemo(
    () => gamesData.filter((game) => wishlistIds.includes(game.id)),
    [wishlistIds]
  );

  const value = {
    wishlistIds,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistGames: () => wishlistGames,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
