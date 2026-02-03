# GameDeals Italia

Piattaforma italiana per il confronto prezzi di videogiochi con offerte aggiornate, wishlist e alert sui ribassi. Il progetto è diviso in frontend React + backend Node.js come base per l'integrazione delle API (IGDB, IsThereAnyDeal) e scraping.

## ✨ Funzionalità principali

- Confronto prezzi da store verificati (Instant Gaming, G2A, Eneba, CDKeys, Kinguin).
- Filtri avanzati per piattaforme, range prezzo e sconto minimo.
- Wishlist e alert personalizzati.
- Storico prezzi con grafici Recharts.

## 📦 Struttura repository

```
frontend/  # React + Tailwind UI
backend/   # Express API
```

## 🚀 Avvio rapido

### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Variabili d'ambiente (frontend)

Imposta `VITE_API_BASE` per puntare al backend remoto:

```
VITE_API_BASE=https://<your-backend-host>
```

### Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

## 🧱 Design System

Le variabili colore e gli stili principali sono gestiti in `frontend/src/styles/index.css` e nel tema Tailwind in `frontend/tailwind.config.js`.

## 🔑 Variabili d'ambiente (backend)

Crea un file `.env` in `backend/`:

```
PORT=4000
CORS_ORIGIN=http://localhost:5173
DATABASE_URL="file:./dev.db"
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=super-secret
ALERT_CHECK_INTERVAL_MS=60000
ENABLE_ALERT_CHECKER=true
```

Per deploy remoto:
- Imposta `CORS_ORIGIN` al dominio del frontend (puoi separare più origini con virgole).
- `DATABASE_URL` deve puntare a un file SQLite scrivibile o a un database remoto supportato da Prisma.
- Su piattaforme serverless (es. Vercel) imposta `ENABLE_ALERT_CHECKER=false` e usa un worker/cron esterno per gli alert.
