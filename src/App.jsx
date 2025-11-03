import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

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

function Login() {
  return (
    <div className="pt-20 text-center text-2xl font-semibold text-gray-700">
      Login / Signup – Coming Soon
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/host" element={<Hosts />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
