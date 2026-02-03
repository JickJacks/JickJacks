import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Game } from "../types/game";
import { useToast } from "../components/Toast";
import { useAuth } from "./AuthContext";
import { addWishlistItem, fetchWishlist, removeWishlistItem } from "../services/api";
import { mapApiGameToGame } from "../utils/mapApiGame";

type WishlistContextValue = {
  wishlistIds: string[];
  addToWishlist: (gameId: string) => void;
  removeFromWishlist: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;
  getWishlistGames: () => Game[];
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistGames, setWishlistGames] = useState<Game[]>([]);
  const { showToast } = useToast();
  const { token } = useAuth();

  useEffect(() => {
    let isActive = true;
    if (!token) {
      setWishlistGames([]);
      return () => {
        isActive = false;
      };
    }
    fetchWishlist(token)
      .then((items) => {
        if (!isActive) return;
        const mapped = items.map((item) => mapApiGameToGame(item, "Best price"));
        setWishlistGames(mapped);
      })
      .catch((error) => {
        console.warn("Failed to load wishlist.", error);
      });
    return () => {
      isActive = false;
    };
  }, [token]);

  const addToWishlist = (gameId: string) => {
    if (!token) {
      showToast("Sign in to manage your wishlist.");
      return;
    }
    if (wishlistGames.some((game) => game.id === gameId)) {
      return;
    }
    addWishlistItem(token, Number(gameId))
      .then((item) => {
        const mapped = mapApiGameToGame(item, "Best price");
        setWishlistGames((prev) => [mapped, ...prev]);
        showToast("Added to wishlist!");
      })
      .catch((error) => {
        console.error("Failed to add wishlist item.", error);
      });
  };

  const removeFromWishlist = (gameId: string) => {
    if (!token) {
      showToast("Sign in to manage your wishlist.");
      return;
    }
    removeWishlistItem(token, Number(gameId))
      .then(() => {
        setWishlistGames((prev) => prev.filter((game) => game.id !== gameId));
        showToast("Removed from wishlist!");
      })
      .catch((error) => {
        console.error("Failed to remove wishlist item.", error);
      });
  };

  const wishlistIds = useMemo(() => wishlistGames.map((game) => game.id), [wishlistGames]);

  const isInWishlist = (gameId: string) => wishlistIds.includes(gameId);

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
