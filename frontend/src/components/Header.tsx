import { Heart, Menu, Search, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

type HeaderProps = {
  onToggleFilters?: () => void;
};

export default function Header({ onToggleFilters }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-bg-secondary/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-color bg-bg-surface lg:hidden"
            onClick={onToggleFilters}
            aria-label="Apri filtri"
          >
            <Menu className="h-5 w-5 text-text-secondary" />
          </button>
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary text-white shadow-glow">
              🎮
            </div>
            <span className="text-lg font-bold gradient-text">GameDeals Italia</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-xl items-center gap-3 rounded-lg border border-border-color bg-bg-surface/80 px-4 py-3 backdrop-blur-xl">
            <Search className="h-5 w-5 text-text-secondary" />
            <input
              className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
              placeholder="Cerca il tuo gioco..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border-color bg-bg-surface hover:bg-bg-surface-hover">
            <Heart className="h-5 w-5 text-text-secondary" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-error text-xs font-bold text-white">
              3
            </span>
          </button>
          <Link
            to="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-color bg-bg-surface hover:bg-bg-surface-hover"
          >
            <UserCircle className="h-5 w-5 text-text-secondary" />
          </Link>
        </div>
      </div>
    </header>
  );
}
