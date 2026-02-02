export type GameDeal = {
  id: string;
  title: string;
  rating: number;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  store: string;
  image: string;
  platforms: string[];
  hotDeal?: boolean;
};

export const topDeals: GameDeal[] = [
  {
    id: "1",
    title: "Cyberpunk 2077: Ultimate Edition",
    rating: 8.5,
    currentPrice: 14.99,
    originalPrice: 59.99,
    discount: 75,
    store: "Instant Gaming",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.jpg",
    platforms: ["PC", "PlayStation 5", "Xbox"],
    hotDeal: true,
  },
  {
    id: "2",
    title: "Elden Ring",
    rating: 9.1,
    currentPrice: 29.99,
    originalPrice: 69.99,
    discount: 57,
    store: "Eneba",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg",
    platforms: ["PC", "PlayStation 5", "Xbox"],
  },
  {
    id: "3",
    title: "The Legend of Zelda: Tears of the Kingdom",
    rating: 9.6,
    currentPrice: 44.9,
    originalPrice: 69.99,
    discount: 36,
    store: "CDKeys",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg",
    platforms: ["Nintendo Switch"],
  },
  {
    id: "4",
    title: "Starfield",
    rating: 8.0,
    currentPrice: 22.49,
    originalPrice: 69.99,
    discount: 68,
    store: "Kinguin",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6r4g.jpg",
    platforms: ["PC", "Xbox"],
  },
  {
    id: "5",
    title: "Baldur's Gate 3",
    rating: 9.2,
    currentPrice: 34.99,
    originalPrice: 59.99,
    discount: 42,
    store: "G2A",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6b9g.jpg",
    platforms: ["PC"],
  },
  {
    id: "6",
    title: "Hogwarts Legacy",
    rating: 8.4,
    currentPrice: 19.99,
    originalPrice: 59.99,
    discount: 67,
    store: "Instant Gaming",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4y4j.jpg",
    platforms: ["PC", "PlayStation 5", "Xbox"],
  },
  {
    id: "7",
    title: "Forza Horizon 5",
    rating: 8.9,
    currentPrice: 18.5,
    originalPrice: 59.99,
    discount: 69,
    store: "Eneba",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3x6d.jpg",
    platforms: ["PC", "Xbox"],
  },
  {
    id: "8",
    title: "Marvel's Spider-Man 2",
    rating: 8.7,
    currentPrice: 39.99,
    originalPrice: 79.99,
    discount: 50,
    store: "CDKeys",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6vdf.jpg",
    platforms: ["PlayStation 5"],
  },
];

export const priceHistory = [
  { date: "05/09", price: 39.99 },
  { date: "10/09", price: 34.99 },
  { date: "15/09", price: 29.99 },
  { date: "20/09", price: 24.99 },
  { date: "25/09", price: 22.49 },
  { date: "30/09", price: 19.99 },
];

export const wishlistPreview = topDeals.slice(0, 3);
