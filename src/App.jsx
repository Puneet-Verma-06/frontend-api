import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/static/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Static/Footer";
import AuthSection from "./components/auth/AuthSection";

// optional placeholder pages (you can add them later)
function Hosts() {
  return (
    <div className="pt-20 text-center text-2xl font-semibold text-gray-700">
      Host Page – Coming Soon
    </div>
  );
}

function Creators() {
  return (
    <div className="pt-20 text-center text-2xl font-semibold text-gray-700">
      Creator Page – Coming Soon
    </div>
  );
}


export default function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Hosts />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/login" element={<AuthSection />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
