import { Bell, CheckCircle2 } from "lucide-react";

const alerts = [
  {
    title: "Starfield",
    target: "€21,99",
    current: "€22,49",
    status: "Quasi al target",
  },
  {
    title: "Hogwarts Legacy",
    target: "€17,99",
    current: "€19,99",
    status: "In monitoraggio",
  },
];

export default function PriceAlertsPanel() {
  return (
    <section className="mt-16 rounded-lg border border-border-color bg-bg-secondary/80 p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Alert prezzi</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Controlla gli avvisi attivi e aggiorna i target.
          </p>
        </div>
        <button className="rounded-md border border-border-color px-3 py-2 text-xs font-semibold text-text-secondary">
          Gestisci alert
        </button>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {alerts.map((alert) => (
          <div
            key={alert.title}
            className="rounded-md border border-border-color bg-bg-surface/70 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-text-primary">{alert.title}</p>
                <p className="mt-1 text-xs text-text-secondary">
                  Target: {alert.target} · Prezzo attuale: {alert.current}
                </p>
              </div>
              <Bell className="h-4 w-4 text-accent-primary" />
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-success">
              <CheckCircle2 className="h-4 w-4" />
              {alert.status}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
