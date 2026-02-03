import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { FilterProvider } from "./context/FilterContext";
import { WishlistProvider } from "./context/WishlistContext";
import GameDetailPage from "./pages/GameDetailPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import WishlistPage from "./pages/WishlistPage";

export default function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <FilterProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/game/:id" element={<GameDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </FilterProvider>
      </WishlistProvider>
    </BrowserRouter>
  );
}
