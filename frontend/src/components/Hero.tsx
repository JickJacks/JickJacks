import { Search } from "lucide-react";

const platforms = ["PC", "PlayStation", "Xbox", "Nintendo"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-16 md:px-8">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-tertiary">
          Sconti verificati ogni giorno
        </p>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-text-primary md:text-6xl">
          Trova i migliori sconti sui tuoi giochi
          <span className="block gradient-text">preferiti in Italia</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base text-text-secondary md:text-lg">
          Confronta automaticamente i prezzi da Instant Gaming, G2A, Eneba, CDKeys e
          Kinguin. Attiva alert smart e risparmia fino al 70%.
        </p>
        <div className="mt-10 w-full max-w-2xl">
          <div className="flex items-center gap-3 rounded-lg border border-border-color bg-bg-surface/80 px-4 py-4 backdrop-blur-xl">
            <Search className="h-5 w-5 text-text-secondary" />
            <input
              className="w-full bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none"
              placeholder="Cerca il tuo gioco..."
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-text-secondary">
            {platforms.map((platform) => (
              <label
                key={platform}
                className="flex items-center gap-2 rounded-lg border border-border-color px-4 py-2 transition hover:scale-105"
              >
                <input type="checkbox" className="h-4 w-4 accent-accent-primary" />
                {platform}
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
