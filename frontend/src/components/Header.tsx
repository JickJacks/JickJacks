import { Gamepad2, Heart, ShoppingCart, UserCircle } from "lucide-react";

const menuItems = [
  "Sconti Piattaforme",
  "PC",
  "PlayStation",
  "Xbox",
  "Nintendo",
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-bg-secondary/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-white shadow-glow">
            <Gamepad2 className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold gradient-text">GameDeals Italia</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-text-secondary md:flex">
          {menuItems.map((item) => (
            <button
              key={item}
              className="transition duration-200 hover:text-text-primary"
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border-color bg-bg-surface hover:bg-bg-surface-hover">
            <Heart className="h-5 w-5 text-text-secondary" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-error text-xs font-bold text-white">
              3
            </span>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-color bg-bg-surface hover:bg-bg-surface-hover">
            <ShoppingCart className="h-5 w-5 text-text-secondary" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-color bg-bg-surface hover:bg-bg-surface-hover">
            <UserCircle className="h-5 w-5 text-text-secondary" />
          </button>
        </div>
      </div>
    </header>
  );
}
