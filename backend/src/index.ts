import "dotenv/config";
import bcrypt from "bcrypt";
import cors from "cors";
import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";
import { z } from "zod";

export const app = express();
export const prisma = new PrismaClient();

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

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type AuthenticatedRequest = express.Request & {
  user?: { id: number; email: string };
};

const parseNumberParam = (value: string | undefined) => {
  if (value === undefined) return { value: undefined, invalid: false };
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return { value: undefined, invalid: true };
  }
  return { value: parsed, invalid: false };
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

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return secret;
};

const createToken = (payload: { id: number; email: string }) =>
  jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });

const authMiddleware = async (req: AuthenticatedRequest, _res: express.Response, next: express.NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next();
  }
  const token = header.slice("Bearer ".length).trim();
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as { id: number; email: string };
    req.user = { id: decoded.id, email: decoded.email };
  } catch (error) {
    console.warn("Invalid auth token.", error);
  }
  return next();
};

const requireAuth = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: { message: "Unauthorized" } });
  }
  return next();
};

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "gamedeals-italia-api" });
});

app.use(authMiddleware);

app.post("/api/auth/register", async (req, res) => {
  try {
    const parsed = authSchema.parse(req.body);
    const email = parsed.email.toLowerCase();
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: { message: "Email already in use." } });
    }
    const passwordHash = await bcrypt.hash(parsed.password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
      select: { id: true, email: true },
    });
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: { message: "Invalid registration data." } });
    }
    console.error(error);
    return res.status(500).json({ error: { message: "Internal server error." } });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const parsed = authSchema.parse(req.body);
    const email = parsed.email.toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: { message: "Invalid credentials." } });
    }
    const valid = await bcrypt.compare(parsed.password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: { message: "Invalid credentials." } });
    }
    const token = createToken({ id: user.id, email: user.email });
    return res.json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: { message: "Invalid login data." } });
    }
    console.error(error);
    return res.status(500).json({ error: { message: "Internal server error." } });
  }
});

app.get("/api/auth/me", requireAuth, (req: AuthenticatedRequest, res) => {
  return res.json({ user: req.user });
});

app.get("/api/games", async (req, res) => {
  try {
    const parsed = querySchema.parse(req.query);
    const q = parsed.q ? sanitizeQuery(parsed.q) : undefined;
    const platforms = toArray(parsed.platform);
    const genres = toArray(parsed.genres);
    const minPriceParam = parseNumberParam(parsed.minPrice);
    const maxPriceParam = parseNumberParam(parsed.maxPrice);
    const yearFromParam = parseNumberParam(parsed.yearFrom);
    const yearToParam = parseNumberParam(parsed.yearTo);
    const sort = parsed.sort ?? "";

    const pageParam = parseNumberParam(parsed.page);
    const limitParam = parseNumberParam(parsed.limit);

    if (
      minPriceParam.invalid ||
      maxPriceParam.invalid ||
      yearFromParam.invalid ||
      yearToParam.invalid ||
      pageParam.invalid ||
      limitParam.invalid
    ) {
      return res.status(400).json({ error: { message: "Invalid query parameters." } });
    }

    const minPrice = minPriceParam.value;
    const maxPrice = maxPriceParam.value;
    const yearFrom = yearFromParam.value;
    const yearTo = yearToParam.value;
    const page = Math.max(1, Math.min(pageParam.value ?? 1, 1000));
    const limit = Math.max(1, Math.min(limitParam.value ?? 20, 50));

    if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
      return res.status(400).json({ error: { message: "Invalid price range." } });
    }
    if (yearFrom !== undefined && yearTo !== undefined && yearFrom > yearTo) {
      return res.status(400).json({ error: { message: "Invalid year range." } });
    }

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

    const orderByMap: Record<string, Prisma.GameOrderByWithRelationInput> = {
      price_asc: { price: "asc" },
      price_desc: { price: "desc" },
      discount_desc: { discount: "desc" },
      newest: { releaseYear: "desc" },
    };
    const orderBy = orderByMap[sort];
    const needsScoreSort = Boolean(q) && !orderBy;
    // JSON array filters (platforms/genres) are handled in-memory to avoid
    // database-specific JSON operators; keep this path explicit to avoid silent mismatches.
    const needsInMemoryFilter = platforms.length > 0 || genres.length > 0 || needsScoreSort;

    let items: Awaited<ReturnType<typeof prisma.game.findMany>> = [];
    let total = 0;

    if (needsInMemoryFilter) {
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

      if (orderBy) {
        if (sort === "price_asc") {
          ordered.sort((a, b) => a.price - b.price);
        } else if (sort === "price_desc") {
          ordered.sort((a, b) => b.price - a.price);
        } else if (sort === "discount_desc") {
          ordered.sort((a, b) => b.discount - a.discount);
        } else if (sort === "newest") {
          ordered.sort((a, b) => b.releaseYear - a.releaseYear);
        }
      } else if (needsScoreSort && q) {
        ordered.sort((a, b) => {
          const scoreA = scoreTitle(a.title, q);
          const scoreB = scoreTitle(b.title, q);
          if (scoreB !== scoreA) return scoreB - scoreA;
          return a.title.localeCompare(b.title);
        });
      }

      total = ordered.length;
      const start = (page - 1) * limit;
      items = ordered.slice(start, start + limit);
    } else {
      total = await prisma.game.count({ where });
      items = await prisma.game.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      });
    }

    const totalPages = Math.max(1, Math.ceil(total / limit));

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
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`GameDeals Italia API listening on port ${port}`);
  });
}
