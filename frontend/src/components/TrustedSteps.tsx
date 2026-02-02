const steps = [
  {
    title: "Aggregazione intelligente",
    description: "Raccogliamo offerte da store affidabili e aggiornati ogni ora.",
  },
  {
    title: "Confronto immediato",
    description: "Ordina per sconto, prezzo o valutazione in pochi secondi.",
  },
  {
    title: "Alert e wishlist",
    description: "Salva i titoli preferiti e ricevi notifiche personalizzate.",
  },
];

export default function TrustedSteps() {
  return (
    <section className="mt-16 grid gap-4 md:grid-cols-3">
      {steps.map((step, index) => (
        <div
          key={step.title}
          className="rounded-md border border-border-color bg-bg-surface/70 p-4"
        >
          <p className="text-xs font-semibold uppercase text-accent-tertiary">
            Step {index + 1}
          </p>
          <h4 className="mt-2 text-lg font-semibold text-text-primary">
            {step.title}
          </h4>
          <p className="mt-2 text-sm text-text-secondary">{step.description}</p>
        </div>
      ))}
    </section>
  );
}
