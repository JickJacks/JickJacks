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

const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    const message = `Request failed with status ${response.status}`;
    throw new Error(message);
  }
  return response.json() as Promise<T>;
};

export const fetchGames = (params: Record<string, string | number | undefined>) =>
  request<GamesResponse<ApiGame>>(buildUrl("/api/games", params));

export const fetchGame = (idOrSlug: string) =>
  request<ApiGame>(buildUrl(`/api/games/${idOrSlug}`));

export const fetchFilters = () => request<FiltersResponse>(buildUrl("/api/filters"));
