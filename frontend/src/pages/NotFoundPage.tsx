import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="mx-auto max-w-[700px] px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="mt-2 text-text-secondary">{t("not_found_message")}</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white"
        >
          {t("not_found_back_home")}
        </Link>
      </div>
    </div>
  );
}
