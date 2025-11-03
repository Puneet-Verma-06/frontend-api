import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function InstagramSection() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      id: 1,
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "A glimpse of Athithya",
    },
    {
      id: 2,
      src: "https://www.w3schools.com/html/movie.mp4",
      title: "Discover Moments",
    },
    {
      id: 3,
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Golden Adventures",
    },
    {
      id: 4,
      src: "https://www.w3schools.com/html/movie.mp4",
      title: "Stories that Inspire",
    },
    {
      id: 4,
      src: "https://www.w3schools.com/html/movie.mp4",
      title: "Discover New Things",
    },
  ];

  return (
    <section className="relative bg-white text-center py-8 px-6">
      {/* Section Header */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
        Connect with us on
      </h2>

      <a
        href="https://www.instagram.com/athithya.in?igsh=OTB2Z21uYmluMXBz"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-yellow-700 mb-10"
      >
        <FaInstagram className="text-yellow-600" />
        INSTA
      </a>

      {/* Video Grid */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 justify-items-center">
        {videos.map((vid) => (
          <motion.div
            key={vid.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="relative cursor-pointer group rounded-2xl overflow-hidden shadow-lg border border-yellow-400"
            onClick={() => setSelectedVideo(vid.src)}
          >
            <video
              src={vid.src}
              muted
              loop
              playsInline
              autoPlay
              className="w-64 h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center">
              <p className="text-white text-lg font-medium mb-4">
                {vid.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* See More Button */}
      <div className="text-center mt-10">
        <a
          href="https://www.instagram.com/athithya.in?igsh=OTB2Z21uYmluMXBz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-yellow-600 text-yellow-700 font-medium px-6 py-2 rounded-lg hover:bg-yellow-600 hover:text-white transition"
        >
          See More…
        </a>
      </div>

      {/* ===== Modal (Lightbox) ===== */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full"
            >
              <button
                className="absolute top-3 right-3 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
                onClick={() => setSelectedVideo(null)}
              >
                <IoClose size={24} />
              </button>

              <video
                src={selectedVideo}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[500px] object-cover"
              />

              <div className="p-4 bg-linear-to-r from-yellow-500 to-yellow-700 flex justify-between items-center">
                <p className="text-white font-semibold">Follow us on Instagram</p>
                <a
                  href="https://www.instagram.com/athithya.in?igsh=OTB2Z21uYmluMXBz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white text-white px-4 py-1 rounded-lg hover:bg-white hover:text-yellow-700 transition"
                >
                  View on Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
