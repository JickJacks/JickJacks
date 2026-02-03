import type { Game, GamePrice, PriceHistoryPoint } from "../types/game";

const stores = [
  {
    id: "steam",
    name: "Steam",
    logo: "https://cdn.simpleicons.org/steam/ffffff",
  },
  {
    id: "epic",
    name: "Epic Games",
    logo: "https://cdn.simpleicons.org/epicgames/ffffff",
  },
  {
    id: "gog",
    name: "GOG",
    logo: "https://cdn.simpleicons.org/gogdotcom/ffffff",
  },
  {
    id: "instant",
    name: "Instant Gaming",
    logo: "https://cdn.simpleicons.org/itchdotio/ffffff",
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "https://cdn.simpleicons.org/amazon/ffffff",
  },
];

const buildPrices = (entries: Array<[string, number, GamePrice["stock"]]>): GamePrice[] =>
  entries.map(([storeId, price, stock]) => {
    const store = stores.find((item) => item.id === storeId)!;
    return {
      store: store.name,
      storeId: store.id,
      storeLogo: store.logo,
      price,
      currency: "EUR",
      stock,
      url: `https://example.com/${store.id}`,
      lastUpdated: new Date().toISOString(),
    };
  });

const buildHistory = (base: Record<string, number>): PriceHistoryPoint[] => {
  const weeks = 12;
  const today = new Date();
  return Array.from({ length: weeks }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (weeks - index) * 7);
    const point: PriceHistoryPoint = { date: date.toISOString().split("T")[0] };
    Object.entries(base).forEach(([store, price]) => {
      const fluctuation = (index % 3) * 1.5;
      point[store] = Number((price - fluctuation).toFixed(2));
    });
    return point;
  });
};

export const gamesData: Game[] = [
  {
    id: "1",
    title: "Cyberpunk 2077: Ultimate Edition",
    description:
      "Night City non dorme mai. Esplora una metropoli futuristica e scegli il tuo destino in un action RPG narrativo.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xte.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xth.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xti.jpg",
    ],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    genres: ["RPG", "Action"],
    releaseDate: "2020-12-10",
    developer: "CD Projekt Red",
    publisher: "CD Projekt",
    prices: buildPrices([
      ["steam", 29.99, "in_stock"],
      ["epic", 34.99, "in_stock"],
      ["gog", 24.99, "in_stock"],
      ["instant", 19.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ steam: 29.99, epic: 34.99, gog: 24.99, instant: 19.99 }),
  },
  {
    id: "2",
    title: "Elden Ring",
    description:
      "Un open world dark fantasy firmato FromSoftware con combattimenti impegnativi e un mondo vasto da esplorare.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf3f7.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf3f8.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf3f9.jpg",
    ],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    genres: ["RPG", "Adventure"],
    releaseDate: "2022-02-25",
    developer: "FromSoftware",
    publisher: "Bandai Namco",
    prices: buildPrices([
      ["steam", 49.99, "in_stock"],
      ["epic", 54.99, "in_stock"],
      ["gog", 44.99, "in_stock"],
      ["amazon", 59.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ steam: 49.99, epic: 54.99, gog: 44.99, amazon: 59.99 }),
  },
  {
    id: "3",
    title: "The Legend of Zelda: Tears of the Kingdom",
    description:
      "La nuova avventura di Link tra isole sospese e dungeon rinnovati con nuove abilità creative.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scgpmh.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scgpmi.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scgpmj.jpg",
    ],
    platforms: ["Nintendo Switch"],
    genres: ["Adventure", "Action"],
    releaseDate: "2023-05-12",
    developer: "Nintendo",
    publisher: "Nintendo",
    prices: buildPrices([
      ["amazon", 59.99, "in_stock"],
      ["instant", 54.99, "in_stock"],
      ["steam", 64.99, "out_of_stock"],
    ]),
    priceHistory: buildHistory({ amazon: 59.99, instant: 54.99, steam: 64.99 }),
  },
  {
    id: "4",
    title: "Starfield",
    description:
      "Esplora oltre 1000 pianeti in un RPG sci-fi di Bethesda, con missioni narrative e combattimenti spaziali.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6r4g.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf73b.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf73c.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf73d.jpg",
    ],
    platforms: ["PC", "Xbox Series X|S"],
    genres: ["RPG", "Sci-Fi"],
    releaseDate: "2023-09-06",
    developer: "Bethesda",
    publisher: "Bethesda",
    prices: buildPrices([
      ["steam", 39.99, "in_stock"],
      ["epic", 44.99, "in_stock"],
      ["instant", 34.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ steam: 39.99, epic: 44.99, instant: 34.99 }),
  },
  {
    id: "5",
    title: "Baldur's Gate 3",
    description:
      "Un RPG a turni ispirato a D&D con scelte profonde, party dinamici e una trama ramificata.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6b9g.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg7kh.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg7ki.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg7kj.jpg",
    ],
    platforms: ["PC", "PlayStation 5"],
    genres: ["RPG", "Strategy"],
    releaseDate: "2023-08-03",
    developer: "Larian Studios",
    publisher: "Larian Studios",
    prices: buildPrices([
      ["steam", 44.99, "in_stock"],
      ["gog", 39.99, "in_stock"],
      ["instant", 32.99, "in_stock"],
      ["epic", 46.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ steam: 44.99, gog: 39.99, instant: 32.99, epic: 46.99 }),
  },
  {
    id: "6",
    title: "Hogwarts Legacy",
    description:
      "Vivi l'esperienza di Hogwarts in un open world magico ambientato nel 1800.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4y4j.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf6z0.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf6z1.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scf6z2.jpg",
    ],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    genres: ["Action", "Adventure"],
    releaseDate: "2023-02-10",
    developer: "Avalanche",
    publisher: "Warner Bros",
    prices: buildPrices([
      ["steam", 29.99, "in_stock"],
      ["epic", 34.99, "in_stock"],
      ["instant", 24.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ steam: 29.99, epic: 34.99, instant: 24.99 }),
  },
  {
    id: "7",
    title: "Forza Horizon 5",
    description:
      "Festival di corse in Messico con meteo dinamico, auto personalizzabili e multiplayer condiviso.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3x6d.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xg4.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xg5.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xg6.jpg",
    ],
    platforms: ["PC", "Xbox Series X|S"],
    genres: ["Racing", "Sports"],
    releaseDate: "2021-11-09",
    developer: "Playground Games",
    publisher: "Xbox Game Studios",
    prices: buildPrices([
      ["steam", 24.99, "in_stock"],
      ["epic", 29.99, "in_stock"],
      ["instant", 19.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ steam: 24.99, epic: 29.99, instant: 19.99 }),
  },
  {
    id: "8",
    title: "Marvel's Spider-Man 2",
    description:
      "Peter Parker e Miles Morales tornano a difendere New York in una nuova avventura d'azione.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6vdf.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg2f7.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg2f8.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg2f9.jpg",
    ],
    platforms: ["PlayStation 5"],
    genres: ["Action", "Adventure"],
    releaseDate: "2023-10-20",
    developer: "Insomniac",
    publisher: "Sony",
    prices: buildPrices([
      ["amazon", 59.99, "in_stock"],
      ["instant", 54.99, "preorder"],
      ["steam", 69.99, "out_of_stock"],
    ]),
    priceHistory: buildHistory({ amazon: 59.99, instant: 54.99, steam: 69.99 }),
  },
  {
    id: "9",
    title: "Assassin's Creed Mirage",
    description:
      "Torna alle origini della saga con un'esperienza stealth concentrata a Baghdad.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6r6v.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg3qs.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg3qt.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg3qu.jpg",
    ],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    genres: ["Action", "Adventure"],
    releaseDate: "2023-10-05",
    developer: "Ubisoft",
    publisher: "Ubisoft",
    prices: buildPrices([
      ["steam", 39.99, "in_stock"],
      ["epic", 34.99, "in_stock"],
      ["instant", 29.99, "in_stock"],
      ["gog", 35.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ steam: 39.99, epic: 34.99, instant: 29.99, gog: 35.99 }),
  },
  {
    id: "10",
    title: "Resident Evil 4 Remake",
    description:
      "Il classico survival horror torna con grafica moderna e gameplay rinnovato.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5x5p.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg6n4.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg6n5.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg6n6.jpg",
    ],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    genres: ["Action", "Horror"],
    releaseDate: "2023-03-24",
    developer: "Capcom",
    publisher: "Capcom",
    prices: buildPrices([
      ["steam", 39.99, "in_stock"],
      ["gog", 34.99, "in_stock"],
      ["instant", 29.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ steam: 39.99, gog: 34.99, instant: 29.99 }),
  },
  {
    id: "11",
    title: "Final Fantasy XVI",
    description:
      "Una nuova saga fantasy con combattimenti action e una trama epica.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5x8k.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg6pw.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg6px.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg6py.jpg",
    ],
    platforms: ["PlayStation 5"],
    genres: ["RPG", "Adventure"],
    releaseDate: "2023-06-22",
    developer: "Square Enix",
    publisher: "Square Enix",
    prices: buildPrices([
      ["amazon", 49.99, "in_stock"],
      ["instant", 44.99, "in_stock"],
      ["steam", 59.99, "out_of_stock"],
    ]),
    priceHistory: buildHistory({ amazon: 49.99, instant: 44.99, steam: 59.99 }),
  },
  {
    id: "12",
    title: "Diablo IV",
    description:
      "Action RPG dark fantasy con dungeon, loot e cooperativa online.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5x8o.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg6r4.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg6r5.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg6r6.jpg",
    ],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    genres: ["RPG", "Action"],
    releaseDate: "2023-06-06",
    developer: "Blizzard",
    publisher: "Blizzard",
    prices: buildPrices([
      ["steam", 49.99, "in_stock"],
      ["epic", 54.99, "in_stock"],
      ["instant", 39.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ steam: 49.99, epic: 54.99, instant: 39.99 }),
  },
  {
    id: "13",
    title: "EA Sports FC 24",
    description:
      "Il calcio next-gen con licenze ufficiali, Ultimate Team e modalità carriera.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6x5b.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9r0.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9r1.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9r2.jpg",
    ],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    genres: ["Sports"],
    releaseDate: "2023-09-29",
    developer: "EA",
    publisher: "EA",
    prices: buildPrices([
      ["steam", 34.99, "in_stock"],
      ["epic", 39.99, "in_stock"],
      ["instant", 29.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ steam: 34.99, epic: 39.99, instant: 29.99 }),
  },
  {
    id: "14",
    title: "Alan Wake 2",
    description:
      "Thriller psicologico con atmosfera dark e narrativa a doppio protagonista.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6x4s.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9m1.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9m2.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9m3.jpg",
    ],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    genres: ["Horror", "Adventure"],
    releaseDate: "2023-10-27",
    developer: "Remedy",
    publisher: "Epic Games",
    prices: buildPrices([
      ["epic", 39.99, "in_stock"],
      ["amazon", 44.99, "in_stock"],
      ["instant", 34.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ epic: 39.99, amazon: 44.99, instant: 34.99 }),
  },
  {
    id: "15",
    title: "Helldivers 2",
    description:
      "Co-op shooter fantascientifico con missioni dinamiche e drop strategici.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6r3t.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9n4.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9n5.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9n6.jpg",
    ],
    platforms: ["PC", "PlayStation 5"],
    genres: ["Action", "Shooter"],
    releaseDate: "2024-02-08",
    developer: "Arrowhead",
    publisher: "Sony",
    prices: buildPrices([
      ["steam", 39.99, "in_stock"],
      ["instant", 34.99, "in_stock"],
      ["amazon", 44.99, "preorder"],
    ]),
    priceHistory: buildHistory({ steam: 39.99, instant: 34.99, amazon: 44.99 }),
  },
  {
    id: "16",
    title: "Lies of P",
    description:
      "Soulslike in stile Belle Epoque con combattimenti rapidi e ambientazioni gotiche.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6lye.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9v1.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9v2.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9v3.jpg",
    ],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    genres: ["Action", "RPG"],
    releaseDate: "2023-09-19",
    developer: "Neowiz",
    publisher: "Neowiz",
    prices: buildPrices([
      ["steam", 29.99, "in_stock"],
      ["gog", 27.99, "in_stock"],
      ["instant", 24.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ steam: 29.99, gog: 27.99, instant: 24.99 }),
  },
  {
    id: "17",
    title: "Persona 3 Reload",
    description:
      "Remake del classico JRPG con grafica aggiornata e nuove colonne sonore.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6r1o.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9y1.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9y2.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/scg9y3.jpg",
    ],
    platforms: ["PC", "PlayStation 5", "Xbox Series X|S"],
    genres: ["RPG", "Simulation"],
    releaseDate: "2024-02-02",
    developer: "Atlus",
    publisher: "Sega",
    prices: buildPrices([
      ["steam", 59.99, "in_stock"],
      ["instant", 49.99, "in_stock"],
      ["amazon", 54.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ steam: 59.99, instant: 49.99, amazon: 54.99 }),
  },
  {
    id: "18",
    title: "Gran Turismo 7",
    description:
      "Simulazione di guida con collezione di auto e meteo dinamico.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2yq5.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xzb.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xzc.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8xzd.jpg",
    ],
    platforms: ["PlayStation 5", "PlayStation 4"],
    genres: ["Racing", "Simulation"],
    releaseDate: "2022-03-04",
    developer: "Polyphony",
    publisher: "Sony",
    prices: buildPrices([
      ["amazon", 39.99, "in_stock"],
      ["instant", 34.99, "in_stock"],
      ["steam", 49.99, "out_of_stock"],
    ]),
    priceHistory: buildHistory({ amazon: 39.99, instant: 34.99, steam: 49.99 }),
  },
  {
    id: "19",
    title: "Sea of Thieves",
    description:
      "Avventura piratesca online con esplorazione, loot e cooperativa.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8tvz.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8tw0.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8tw1.jpg",
    ],
    platforms: ["PC", "Xbox One"],
    genres: ["Adventure", "Action"],
    releaseDate: "2018-03-20",
    developer: "Rare",
    publisher: "Xbox Game Studios",
    prices: buildPrices([
      ["steam", 19.99, "in_stock"],
      ["instant", 14.99, "in_stock"],
      ["gog", 17.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ steam: 19.99, instant: 14.99, gog: 17.99 }),
  },
  {
    id: "20",
    title: "Stardew Valley",
    description:
      "Simulatore agricolo indie con gestione della fattoria e relazioni con i cittadini.",
    coverImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7j.jpg",
    screenshots: [
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8tw7.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8tw8.jpg",
      "https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc8tw9.jpg",
    ],
    platforms: ["PC", "Nintendo Switch"],
    genres: ["Simulation", "RPG"],
    releaseDate: "2016-02-26",
    developer: "ConcernedApe",
    publisher: "ConcernedApe",
    prices: buildPrices([
      ["steam", 9.99, "in_stock"],
      ["gog", 11.99, "in_stock"],
      ["instant", 7.99, "in_stock"],
    ]),
    priceHistory: buildHistory({ steam: 9.99, gog: 11.99, instant: 7.99 }),
  },
];

export const storeCatalog = stores;
