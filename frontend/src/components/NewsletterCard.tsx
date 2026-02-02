import { Mail } from "lucide-react";

export default function NewsletterCard() {
  return (
    <section className="mt-16 rounded-lg border border-border-color bg-gradient-primary/10 p-6 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Ricevi alert personalizzati</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Imposta un budget e ricevi notifiche appena il prezzo scende.
          </p>
        </div>
        <button className="rounded-md bg-accent-primary px-4 py-2 text-xs font-semibold text-white">
          Crea un alert
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-border-color bg-bg-secondary/70 px-3 py-2">
          <Mail className="h-4 w-4 text-text-secondary" />
          <input
            className="w-full bg-transparent text-xs text-text-primary placeholder:text-text-muted focus:outline-none"
            placeholder="Inserisci la tua email"
          />
        </div>
        <button className="rounded-md border border-border-color px-4 py-2 text-xs font-semibold text-text-secondary">
          Iscriviti
        </button>
      </div>
    </section>
  );
}
