const footerLinks = [
  {
    title: "Chi siamo",
    links: ["Informativa", "Privacy", "Cookie", "Termini"],
  },
  {
    title: "Social",
    links: ["Twitter", "Instagram", "Discord"],
  },
  {
    title: "Contatti",
    links: ["info@gamedeals.it", "Supporto"],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-bg-primary px-4 py-16 md:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-3">
        {footerLinks.map((column) => (
          <div key={column.title}>
            <h4 className="text-sm font-semibold uppercase text-text-primary">
              {column.title}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              {column.links.map((link) => (
                <li key={link} className="hover:text-accent-primary">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center text-xs text-text-muted">
        © 2024 GameDeals Italia - Tutti i diritti riservati
      </p>
    </footer>
  );
}
