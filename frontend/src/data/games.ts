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
  description: string;
  screenshots: string[];
  genres: string[];
  releaseDate: string;
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
    description:
      "Night City non dorme mai. Esplora una metropoli futuristica e scegli il tuo destino in un action RPG narrativo.",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xte.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xth.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xti.jpg",
    ],
    genres: ["RPG", "Action"],
    releaseDate: "10/12/2020",
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
    description:
      "Un open world dark fantasy firmato FromSoftware con combattimenti impegnativi e un mondo vasto da esplorare.",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf3f7.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf3f8.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf3f9.jpg",
    ],
    genres: ["RPG", "Adventure"],
    releaseDate: "25/02/2022",
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
    description:
      "La nuova avventura di Link tra isole sospese e dungeon rinnovati con nuove abilità creative.",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scgpmh.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scgpmi.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scgpmj.jpg",
    ],
    genres: ["Adventure", "Action"],
    releaseDate: "12/05/2023",
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
    description:
      "Esplora oltre 1000 pianeti in un RPG sci-fi di Bethesda, con missioni narrative e combattimenti spaziali.",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf73b.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf73c.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf73d.jpg",
    ],
    genres: ["RPG", "Sci-Fi"],
    releaseDate: "06/09/2023",
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
    description:
      "Un RPG a turni ispirato a D&D con scelte profonde, party dinamici e una trama ramificata.",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg7kh.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg7ki.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg7kj.jpg",
    ],
    genres: ["RPG", "Strategy"],
    releaseDate: "03/08/2023",
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
    description:
      "Vivi l'esperienza di Hogwarts in un open world magico ambientato nel 1800.",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf6z0.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf6z1.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf6z2.jpg",
    ],
    genres: ["Action", "Adventure"],
    releaseDate: "10/02/2023",
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
    description:
      "Festival di corse in Messico con meteo dinamico, auto personalizzabili e multiplayer condiviso.",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xg4.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xg5.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xg6.jpg",
    ],
    genres: ["Racing", "Action"],
    releaseDate: "09/11/2021",
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
    description:
      "Peter Parker e Miles Morales tornano a difendere New York in una nuova avventura d'azione.",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg2f7.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg2f8.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg2f9.jpg",
    ],
    genres: ["Action", "Adventure"],
    releaseDate: "20/10/2023",
  },
];
