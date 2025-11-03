import React from "react";
import VideoCarousel from "../components/VideoCarousel";
import AboutOfferings from "../components/AboutOfferings";
import StatsShowcase from "../components/StatsShowcase";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <VideoCarousel />
      <AboutOfferings/>
      <StatsShowcase/>
    </div>
  );
}
