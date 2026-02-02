const stats = [
  { label: "Offerte live", value: "12.480+" },
  { label: "Store verificati", value: "5" },
  { label: "Wishlist attive", value: "24k" },
  { label: "Alert prezzo inviati", value: "310k" },
];

export default function StatsStrip() {
  return (
    <section className="px-4 pb-6 md:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-4 rounded-lg border border-border-color bg-bg-surface/70 p-6 text-center text-sm text-text-secondary backdrop-blur md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-semibold text-text-primary">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
