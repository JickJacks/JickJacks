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
```
