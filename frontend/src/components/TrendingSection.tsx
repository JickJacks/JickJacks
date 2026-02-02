import { Flame } from "lucide-react";

const trending = [
  {
    title: "Helldivers 2",
    price: "€24,99",
    discount: "-60%",
  },
  {
    title: "Alan Wake 2",
    price: "€29,49",
    discount: "-45%",
  },
  {
    title: "FC 24",
    price: "€19,90",
    discount: "-55%",
  },
];

export default function TrendingSection() {
  return (
    <section className="mt-16 rounded-lg border border-border-color bg-bg-surface/70 p-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
        <Flame className="h-4 w-4 text-hot-deal" />
        Trending ora
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {trending.map((item) => (
          <div
            key={item.title}
            className="rounded-md border border-border-color bg-bg-secondary/70 p-4 text-xs"
          >
            <p className="text-sm font-semibold text-text-primary">{item.title}</p>
            <p className="mt-1 text-text-secondary">{item.price}</p>
            <span className="mt-2 inline-flex rounded-full bg-hot-deal/20 px-2 py-1 text-xs text-hot-deal">
              {item.discount}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
