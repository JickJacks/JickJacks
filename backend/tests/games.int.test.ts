import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import request from "supertest";
import type { Express } from "express";
import type { PrismaClient } from "@prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../..");
const testDbPath = path.join(repoRoot, "backend", "prisma", "test.db");
const databaseUrl = `file:${testDbPath}`;

let app: Express;
let prisma: PrismaClient;

const setupDatabase = () => {
  if (fs.existsSync(testDbPath)) {
    fs.rmSync(testDbPath);
  }
  execSync("npx prisma db push --schema backend/prisma/schema.prisma", {
    cwd: repoRoot,
    env: { ...process.env, DATABASE_URL: databaseUrl },
    stdio: "pipe",
  });
  execSync("npx tsx backend/prisma/seed.ts", {
    cwd: repoRoot,
    env: { ...process.env, DATABASE_URL: databaseUrl },
    stdio: "pipe",
  });
};

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  process.env.DATABASE_URL = databaseUrl;
  setupDatabase();
  const module = await import("../src/index.ts");
  app = module.app;
  prisma = module.prisma;
});

afterAll(async () => {
  await prisma?.$disconnect();
  if (fs.existsSync(testDbPath)) {
    fs.rmSync(testDbPath);
  }
});

describe("GET /api/games", () => {
  it("returns 200 with meta for page=1&limit=5", async () => {
    const response = await request(app).get("/api/games?page=1&limit=5");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        items: expect.any(Array),
        meta: expect.objectContaining({
          total: expect.any(Number),
          page: 1,
          limit: 5,
        }),
      })
    );
  });

  it("returns 400 for invalid numeric params", async () => {
    const response = await request(app).get("/api/games?minPrice=abc");
    expect(response.status).toBe(400);
  });

  it("returns 400 when minPrice > maxPrice", async () => {
    const response = await request(app).get("/api/games?minPrice=50&maxPrice=10");
    expect(response.status).toBe(400);
  });

  it("returns empty items when no games match filters", async () => {
    const response = await request(app).get("/api/games?minPrice=9999");
    expect(response.status).toBe(200);
    expect(response.body.items).toHaveLength(0);
    expect(response.body.meta.total).toBe(0);
  });
});

describe("GET /api/games/:idOrSlug", () => {
  it("returns 200 for an existing seeded game", async () => {
    const listResponse = await request(app).get("/api/games?page=1&limit=1");
    const [first] = listResponse.body.items as Array<{ id: number; slug: string }>;
    const response = await request(app).get(`/api/games/${first.slug}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ id: first.id, slug: first.slug }));
  });

  it("returns 404 for a missing game", async () => {
    const response = await request(app).get("/api/games/999999");
    expect(response.status).toBe(404);
  });
});
