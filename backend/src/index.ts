import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "gamedeals-italia-api" });
});

app.get("/api/deals/highlights", (_req, res) => {
  res.json({
    updatedAt: new Date().toISOString(),
    stores: ["Instant Gaming", "G2A", "Eneba", "CDKeys", "Kinguin"],
    featured: {
      title: "Cyberpunk 2077: Ultimate Edition",
      discount: 75,
      price: 14.99,
      platform: "PC",
    },
  });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`GameDeals Italia API listening on port ${port}`);
});
