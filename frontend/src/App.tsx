import DealsSection from "./components/DealsSection";
import FeaturedModal from "./components/FeaturedModal";
import FiltersSidebar from "./components/FiltersSidebar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import NewsletterCard from "./components/NewsletterCard";
import PriceAlertsPanel from "./components/PriceAlertsPanel";
import ProfileSection from "./components/ProfileSection";
import StatsStrip from "./components/StatsStrip";
import StoreHighlights from "./components/StoreHighlights";
import TrendingSection from "./components/TrendingSection";
import TrustedSteps from "./components/TrustedSteps";
import WishlistSidebar from "./components/WishlistSidebar";
import { wishlistPreview } from "./data/games";

export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header />
      <Hero />
      <StatsStrip />
      <main className="mx-auto flex max-w-[1440px] gap-8 px-4 md:px-8">
        <FiltersSidebar />
        <div className="flex-1">
          <DealsSection />
          <TrendingSection />
          <FeaturedModal />
          <StoreHighlights />
          <PriceAlertsPanel />
          <ProfileSection />
          <NewsletterCard />
          <TrustedSteps />
        </div>
        <WishlistSidebar items={wishlistPreview} />
      </main>
      <Footer />
    </div>
  );
}
