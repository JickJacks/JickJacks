const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

export type GamesResponse<T> = {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type FiltersResponse = {
  platforms: string[];
  genres: string[];
  years: number[];
};

export type ApiGame = {
  id: number;
  title: string;
  slug: string;
  platforms: string[];
  genres: string[];
  price: number;
  originalPrice?: number | null;
  discount: number;
  releaseYear: number;
  thumbnail: string;
  description?: string | null;
  priceHistory: unknown;
};

const buildUrl = (path: string, params?: Record<string, string | number | undefined>) => {
  const url = new URL(path, API_BASE);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
};

const request = async <T>(url: string, init: RequestInit = {}): Promise<T> => {
  const response = await fetch(url, init);
  if (!response.ok) {
    const message = `Request failed with status ${response.status}`;
    throw new Error(message);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json() as Promise<T>;
};

export const fetchGames = (
  params: Record<string, string | number | undefined>,
  signal?: AbortSignal
) => request<GamesResponse<ApiGame>>(buildUrl("/api/games", params), signal ? { signal } : {});

export const fetchGame = (idOrSlug: string, signal?: AbortSignal) =>
  request<ApiGame>(buildUrl(`/api/games/${idOrSlug}`), signal ? { signal } : {});

export const fetchFilters = (signal?: AbortSignal) =>
  request<FiltersResponse>(buildUrl("/api/filters"), signal ? { signal } : {});

export type AuthUser = {
  id: number;
  email: string;
};

export type AlertStatus = "pending" | "triggered";

export type ApiAlert = {
  id: number;
  gameId: number;
  targetPrice: number;
  status: AlertStatus;
  createdAt: string;
  updatedAt: string;
  game: ApiGame;
};

type AuthResponse = {
  user: AuthUser;
  token: string;
};

export const registerUser = (email: string, password: string) =>
  request<AuthResponse>(buildUrl("/api/auth/register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

export const loginUser = (email: string, password: string) =>
  request<AuthResponse>(buildUrl("/api/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

export const fetchCurrentUser = (token: string) =>
  request<{ user: AuthUser }>(buildUrl("/api/auth/me"), {
    headers: { Authorization: `Bearer ${token}` },
  });

export const logoutUser = (token: string) =>
  request<void>(buildUrl("/api/auth/logout"), {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchWishlist = (token: string) =>
  request<{ items: ApiGame[] }>(buildUrl("/api/wishlist"), {
    headers: { Authorization: `Bearer ${token}` },
  }).then((response) => response.items);

export const addWishlistItem = (token: string, gameId: number) =>
  request<{ item: ApiGame }>(buildUrl("/api/wishlist"), {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ gameId }),
  }).then((response) => response.item);

export const removeWishlistItem = (token: string, gameId: number) =>
  request<void>(buildUrl(`/api/wishlist/${gameId}`), {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchAlerts = (token: string) =>
  request<{ items: ApiAlert[] }>(buildUrl("/api/alerts"), {
    headers: { Authorization: `Bearer ${token}` },
  }).then((response) => response.items);

export const createAlert = (token: string, gameId: number, targetPrice: number) =>
  request<{ item: ApiAlert }>(buildUrl("/api/alerts"), {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ gameId, targetPrice }),
  }).then((response) => response.item);

export const deleteAlert = (token: string, id: number) =>
  request<void>(buildUrl(`/api/alerts/${id}`), {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
