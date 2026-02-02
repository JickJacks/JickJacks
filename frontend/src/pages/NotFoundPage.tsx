import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="mx-auto max-w-[700px] px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="mt-2 text-text-secondary">Pagina non trovata.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Torna alla home
        </Link>
      </div>
    </div>
  );
}
