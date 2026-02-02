import { BellRing, Mail, Settings2, User } from "lucide-react";

const alerts = [
  {
    game: "Cyberpunk 2077",
    target: "€19,99",
    current: "€29,99",
  },
  {
    game: "Baldur's Gate 3",
    target: "€29,99",
    current: "€34,99",
  },
];

const preferences = [
  "Notifiche email attive",
  "Sconto minimo: 50%",
  "Piattaforme preferite: PC, PlayStation",
  "Store preferiti: Instant Gaming, Eneba",
];

export default function ProfileSection() {
  return (
    <section className="mt-16 rounded-lg border border-border-color bg-bg-surface/70 p-6 shadow-md backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Profilo utente</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Gestisci i tuoi dati e le preferenze di notifica.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-md border border-border-color px-3 py-2 text-xs font-semibold text-text-secondary">
          <Settings2 className="h-4 w-4" />
          Preferenze
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-md border border-border-color bg-bg-secondary/70 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary/20">
              <User className="h-6 w-6 text-accent-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary">GameHunter_IT</p>
              <p className="text-xs text-text-secondary">utente@gamedeals.it</p>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs text-text-secondary">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-success" />
              Email verificata
            </div>
            {preferences.map((item) => (
              <p key={item}>• {item}</p>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-border-color bg-bg-secondary/70 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <BellRing className="h-4 w-4 text-warning" />
            Alert prezzi attivi
          </div>
          <div className="mt-4 space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.game}
                className="rounded-md border border-border-color bg-bg-surface/60 p-3 text-xs text-text-secondary"
              >
                <p className="text-sm font-semibold text-text-primary">{alert.game}</p>
                <p className="mt-1">Avvisami quando scende a: {alert.target}</p>
                <p>Prezzo attuale: {alert.current}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
