import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Header from "../components/Header";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistPage() {
  const { getWishlistGames, removeFromWishlist } = useWishlist();
  const wishlistGames = getWishlistGames();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header />
      <main className="mx-auto max-w-[1440px] px-4 py-8 md:px-8">
        <h1 className="text-2xl font-semibold">
          My Wishlist ({wishlistGames.length} games)
        </h1>
        {wishlistGames.length === 0 ? (
          <div className="mt-6 rounded-lg border border-border-color bg-bg-surface/70 p-8 text-center text-text-secondary">
            Nessun gioco salvato.
            <div className="mt-4">
              <Link
                to="/"
                className="inline-flex rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white"
              >
                Browse games
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {wishlistGames.map((game) => {
              const bestPrice = [...game.prices].sort((a, b) => a.price - b.price)[0];
              return (
                <div
                  key={game.id}
                  className="relative overflow-hidden rounded-md border border-border-color bg-bg-surface"
                >
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    className="h-[200px] w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-lg font-semibold text-text-primary">
                      {game.title}
                    </h3>
                    <div className="mt-2 text-sm text-success">
                      €{bestPrice.price.toFixed(2)}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {game.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="rounded-full border border-border-color px-2 py-1 text-xs text-text-secondary"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => removeFromWishlist(game.id)}
                      className="mt-4 flex items-center gap-2 text-xs text-error"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove from wishlist
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
