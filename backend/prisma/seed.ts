import { PrismaClient } from "@prisma/client";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(__dirname, "../../frontend/src/data/gamesData.ts");

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const derivePricing = (prices: Array<{ price: number }>) => {
  const sorted = [...prices].sort((a, b) => a.price - b.price);
  const minPrice = sorted[0]?.price ?? 0;
  const maxPrice = sorted[sorted.length - 1]?.price ?? minPrice;
  const discount = maxPrice > 0 ? Math.round((1 - minPrice / maxPrice) * 100) : 0;
  return { price: minPrice, originalPrice: maxPrice, discount };
};

const releaseYearFromDate = (value: string | undefined) => {
  if (!value) return 0;
  const year = Number(value.split("-")[0]);
  return Number.isNaN(year) ? 0 : year;
};

const normalizeStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];

async function main() {
  const module = await import(dataPath);
  const games = module.gamesData as Array<{
    title: string;
    description?: string;
    coverImage?: string;
    platforms: string[];
    genres: string[];
    releaseDate?: string;
    prices: Array<{ price: number }>;
    priceHistory: unknown;
  }>;

  for (const game of games) {
    const slug = slugify(game.title);
    if (!slug) continue;

    const { price, originalPrice, discount } = derivePricing(game.prices);
    const releaseYear = releaseYearFromDate(game.releaseDate);
    const platforms = normalizeStringArray(game.platforms);
    const genres = normalizeStringArray(game.genres);

    await prisma.game.upsert({
      where: { slug },
      update: {
        title: game.title,
        platforms,
        genres,
        price,
        originalPrice,
        discount,
        releaseYear,
        thumbnail: game.coverImage ?? "",
        description: game.description ?? null,
        priceHistory: game.priceHistory,
      },
      create: {
        title: game.title,
        slug,
        platforms,
        genres,
        price,
        originalPrice,
        discount,
        releaseYear,
        thumbnail: game.coverImage ?? "",
        description: game.description ?? null,
        priceHistory: game.priceHistory,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
