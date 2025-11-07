import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/static/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Static/Footer";
import AuthSection from "./components/auth/AuthSection";
import Creators from "./pages/Creators";
import SpecialMentionsPage from "./pages/SpecialMentions";
import HelpSupportPage from "./pages/footer/Support";



export default function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<SpecialMentionsPage />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/login" element={<AuthSection />} />
          <Route path="/support" element={<HelpSupportPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
