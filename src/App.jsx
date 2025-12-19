import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Static/Navbar";
import LoginNav from "./components/Static/LoginNav";

import Home from "./pages/Home";
import Creators from "./pages/Creators";
import SpecialMentionsPage from "./pages/SpecialMentions";
import HelpSupportPage from "./pages/footer/Support";
import Explore from "./pages/Explore";
import ConnectPage from "./pages/ConnectPage";
import TravelProfilePage from "./pages/Profile";
import CreatePostForm from "./pages/PostForm";
import SinglePlace from "./pages/SinglePlace";
import ChatPage from "./pages/ChatPage";
import Footer from "./components/Static/Footer";
import Connect from "./components/connect/Connect";
import BestSeasonUttarakhand from "./pages/guides/BestSeasonUttarakhand";
import TopPlacesUttarakhand from "./pages/guides/TopPlaceUttarakhand";

function App() {
  const location = useLocation();

  // get token from localstorage
  const token = localStorage.getItem("auth_token");
  const isLoggedIn = token && token !== "null" && token !== "undefined"; 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col">

      {isLoggedIn ? <LoginNav /> : <Navbar />}

      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentions" element={<SpecialMentionsPage />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/support" element={<HelpSupportPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/profile" element={<TravelProfilePage />} />
          <Route path="/post" element={<CreatePostForm />} />
          <Route path="/place/:city" element={<SinglePlace />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/guides/best-season-to-visit-uttarakhand" element={<BestSeasonUttarakhand />} />
          <Route path="/guides/top-7-himalayan-treks" element={<TopPlacesUttarakhand />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
