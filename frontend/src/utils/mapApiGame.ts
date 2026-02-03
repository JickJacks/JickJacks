import type { Game, GamePrice, PriceHistoryPoint } from "../types/game";
import type { ApiGame } from "../services/api";

const normalizeStock = (value: unknown): GamePrice["stock"] => {
  if (value === "in_stock" || value === "out_of_stock" || value === "preorder") {
    return value;
  }
  return "in_stock";
};

export const mapApiGameToGame = (
  item: ApiGame,
  bestPriceStore: string,
  stockValue?: unknown
): Game => ({
  id: String(item.id ?? ""),
  title: item.title ?? "Unknown title",
  description: item.description ?? "",
  coverImage: item.thumbnail ?? "",
  screenshots: [],
  platforms: Array.isArray(item.platforms) ? item.platforms : [],
  genres: Array.isArray(item.genres) ? item.genres : [],
  releaseDate: item.releaseYear ? `${item.releaseYear}-01-01` : "1970-01-01",
  developer: "",
  publisher: "",
  prices: [
    {
      store: bestPriceStore,
      storeId: "api",
      storeLogo: "",
      price: Number.isFinite(item.price) ? item.price : 0,
      currency: "EUR",
      stock: normalizeStock(stockValue),
      url: "#",
      lastUpdated: new Date().toISOString(),
    },
  ],
  priceHistory: Array.isArray(item.priceHistory)
    ? (item.priceHistory as PriceHistoryPoint[])
    : [],
});
