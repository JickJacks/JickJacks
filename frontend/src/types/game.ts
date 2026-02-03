export interface GamePrice {
  store: string;
  storeId: string;
  storeLogo: string;
  price: number;
  currency: string;
  stock: "in_stock" | "out_of_stock" | "preorder";
  url: string;
  lastUpdated: string;
}

export interface PriceHistoryPoint {
  date: string;
  [storeName: string]: number | string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  screenshots: string[];
  platforms: string[];
  genres: string[];
  releaseDate: string;
  developer: string;
  publisher: string;
  prices: GamePrice[];
  priceHistory: PriceHistoryPoint[];
}
