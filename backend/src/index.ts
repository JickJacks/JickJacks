import "dotenv/config";
import cors from "cors";
import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { z } from "zod";

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
app.use(express.json());

const sanitizeQuery = (value: string) =>
  value
    .trim()
    .slice(0, 120)
    .replace(/[^\p{L}\p{N}\s-]/gu, "");

const querySchema = z.object({
  q: z.string().optional(),
  platform: z.string().optional(),
  genres: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  yearFrom: z.string().optional(),
  yearTo: z.string().optional(),
  sort: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

const parseNumber = (value: string | undefined) => {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const toArray = (value?: string) =>
  value
    ? value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

const scoreTitle = (title: string, query: string) => {
  const normalizedTitle = title.toLowerCase();
  const normalizedQuery = query.toLowerCase();
  if (normalizedTitle === normalizedQuery) return 3;
  if (normalizedTitle.startsWith(normalizedQuery)) return 2;
  if (normalizedTitle.includes(normalizedQuery)) return 1;
  return 0;
};

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "gamedeals-italia-api" });
});

app.get("/api/games", async (req, res) => {
  try {
    const parsed = querySchema.parse(req.query);
    const q = parsed.q ? sanitizeQuery(parsed.q) : undefined;
    const platforms = toArray(parsed.platform);
    const genres = toArray(parsed.genres);
    const minPrice = parseNumber(parsed.minPrice);
    const maxPrice = parseNumber(parsed.maxPrice);
    const yearFrom = parseNumber(parsed.yearFrom);
    const yearTo = parseNumber(parsed.yearTo);
    const sort = parsed.sort ?? "";

    const page = Math.max(1, Math.min(parseNumber(parsed.page) ?? 1, 1000));
    const limit = Math.max(1, Math.min(parseNumber(parsed.limit) ?? 20, 50));

    const where: Prisma.GameWhereInput = {};

    if (q) {
      where.title = { contains: q, mode: "insensitive" };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {
        gte: minPrice ?? undefined,
        lte: maxPrice ?? undefined,
      };
    }

    if (yearFrom !== undefined || yearTo !== undefined) {
      where.releaseYear = {
        gte: yearFrom ?? undefined,
        lte: yearTo ?? undefined,
      };
    }

    const games = await prisma.game.findMany({ where });

    const filtered = games.filter((game) => {
      const gamePlatforms = Array.isArray(game.platforms) ? game.platforms : [];
      const gameGenres = Array.isArray(game.genres) ? game.genres : [];

      if (platforms.length > 0) {
        const hasPlatform = gamePlatforms.some((platform) => platforms.includes(platform));
        if (!hasPlatform) return false;
      }

      if (genres.length > 0) {
        const hasGenre = gameGenres.some((genre) => genres.includes(genre));
        if (!hasGenre) return false;
      }

      return true;
    });

    let ordered = [...filtered];

    if (sort === "price_asc") {
      ordered.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      ordered.sort((a, b) => b.price - a.price);
    } else if (sort === "discount_desc") {
      ordered.sort((a, b) => b.discount - a.discount);
    } else if (sort === "newest") {
      ordered.sort((a, b) => b.releaseYear - a.releaseYear);
    } else if (q) {
      ordered.sort((a, b) => {
        const scoreA = scoreTitle(a.title, q);
        const scoreB = scoreTitle(b.title, q);
        if (scoreB !== scoreA) return scoreB - scoreA;
        return a.title.localeCompare(b.title);
      });
    }

    const total = ordered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const items = ordered.slice(start, start + limit);

    res.json({
      items,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: { message: "Invalid query parameters." } });
    }
    console.error(error);
    return res.status(500).json({ error: { message: "Internal server error." } });
  }
});

app.get("/api/games/:idOrSlug", async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const id = Number(idOrSlug);

    const game = Number.isFinite(id)
      ? await prisma.game.findUnique({ where: { id } })
      : await prisma.game.findUnique({ where: { slug: idOrSlug } });

    if (!game) {
      return res.status(404).json({ error: { message: "Game not found." } });
    }

    return res.json(game);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: "Internal server error." } });
  }
});

app.get("/api/filters", async (_req, res) => {
  try {
    const games = await prisma.game.findMany({
      select: { platforms: true, genres: true, releaseYear: true },
    });

    const platforms = new Set<string>();
    const genres = new Set<string>();
    const years = new Set<number>();

    games.forEach((game) => {
      const gamePlatforms = Array.isArray(game.platforms) ? game.platforms : [];
      const gameGenres = Array.isArray(game.genres) ? game.genres : [];

      gamePlatforms.forEach((platform) => platforms.add(platform));
      gameGenres.forEach((genre) => genres.add(genre));
      if (game.releaseYear) years.add(game.releaseYear);
    });

    return res.json({
      platforms: Array.from(platforms).sort(),
      genres: Array.from(genres).sort(),
      years: Array.from(years).sort((a, b) => a - b),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: { message: "Internal server error." } });
  }
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`GameDeals Italia API listening on port ${port}`);
});
