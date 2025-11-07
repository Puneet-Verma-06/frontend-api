// src/components/AuthSection.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const videos = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
];

export default function AuthSection() {
  const [method, setMethod] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [membership, setMembership] = useState("");
  const [agree, setAgree] = useState(false);

  // --- NEW: auto-advance single video carousel (no nav) ---
  const [vIdx, setVIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setVIdx((i) => (i + 1) % videos.length);
    }, 6000); // change every 6s
    return () => clearInterval(id);
  }, []);

  const isGold = "text-[#f5b300]";
  const borderGold = "border-[#f5b300]";
  const bgGold = "bg-[#f5b300]";

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Continue with ${method}`);
  }

  return (
    <div className=" my-32 py-4 flex flex-col md:flex-row max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      {/* LEFT */}
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-100">
        <img src="/atithya_logo.jpg" alt="atithya_logo" className="h-10 mb-4 -mt-4" />

        {/* ONE VIDEO BOX WITH AUTO-SCROLL */}
        <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow border border-gray-100">
          <div className="bg-black">
            <AnimatePresence mode="wait">
              <motion.video
                key={vIdx}
                src={videos[vIdx]}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-48 md:h-56 object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>
          {/* Optional captions for four slots */}
          <div className="absolute inset-x-0 bottom-0 bg-black/40 text-white text-xs sm:text-sm px-3 py-2 flex items-center justify-between">
            <span>{["Adventure", "Explore", "Culture", "Fun"][vIdx]}</span>
            <span className="flex gap-1">
              {videos.map((_, i) => (
                <span
                  key={i}
                  className={`inline-block w-2 h-2 rounded-full ${i === vIdx ? "bg-white" : "bg-white/40"}`}
                  aria-hidden
                />
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-[Poppins]">
          Already a member? <span className="text-[#f5b300]">Login</span>
        </h2>

        {/* Tabs */}
        <div className="flex justify-around border-b border-gray-200 mb-6 text-sm font-medium text-gray-600">
          {["mobile", "email"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`relative cursor-pointer pb-2 w-1/3 ${
                method === m ? "text-[#f5b300] font-semibold" : "hover:text-[#f5b300]"
              }`}
            >
              {m === "mobile" ? "Mobile Number" : m === "email" ? "Email Address" : undefined}
              {method === m && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#f5b300] rounded-full"
                  transition={{ duration: 0.25 }}
                />
              )}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {method === "mobile" && (
              <motion.div
                key="mobile"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <span className="px-3 text-gray-700 border-r border-gray-200 flex items-center gap-1">🇮🇳 +91</span>
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    className="flex-1 px-4 py-2 outline-none text-sm"
                  />
                </div>
              </motion.div>
            )}
            {method === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none text-sm"
                />
              </motion.div>
            )}
            {method === "membership" && (
              <motion.div
                key="membership"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  placeholder="Enter your membership number"
                  value={membership}
                  onChange={(e) => setMembership(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none text-sm"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Checkbox */}
          <label className="flex items-start text-sm text-gray-600 gap-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className={`mt-1 w-4 h-4 rounded border ${borderGold} accent-[#f5b300]`}
            />
            <span>
              I have read and agree to the {" "}
              <a href="#" className="font-semibold text-[#f5b300]">Privacy Policy</a> and {" "}
              <a href="#" className="font-semibold text-[#f5b300]">Terms & Condition</a>.
            </span>
          </label>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`${bgGold} cursor-pointer text-white px-10 py-2 rounded-full font-medium hover:bg-[#dca800] transition`}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
