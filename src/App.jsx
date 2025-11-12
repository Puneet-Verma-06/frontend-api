import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Static/Navbar";
import LoginNav from "./components/Static/LoginNav";
import Home from "./pages/Home";
import Footer from "./components/Static/Footer";
import Creators from "./pages/Creators";
import SpecialMentionsPage from "./pages/SpecialMentions";
import HelpSupportPage from "./pages/footer/Support";
import { Explore } from "./pages/Explore";
import { useEffect } from "react";
import ConnectPage from "./pages/ConnectPage";

// Component that handles conditional navbar rendering
function Layout() {
  const location = useLocation();
  const isExplore = location.pathname === "/explore";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {isExplore ? <LoginNav /> : <Navbar />}

      {/* Main content */}
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentions" element={<SpecialMentionsPage />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/support" element={<HelpSupportPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/connect" element={<ConnectPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout
