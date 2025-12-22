import React, { useEffect, useState } from "react";
import FeaturedTrekCard from "../cards/FeaturedTrekCard";
import { getNearbyTreks } from "../../api/explore";

const NearbyTreks = () => {
  const [loading, setLoading] = useState(true);
  const [treks, setTreks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;

          const res = await getNearbyTreks({ latitude, longitude });

          setTreks(res?.treks || []);
        } catch (err) {
          console.error("Nearby treks error:", err);
          setError("Failed to load nearby treks");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.warn("Location denied:", err);
        setError("Location permission denied");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
      }
    );
  }, []);

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return (
      <div className="flex gap-4 px-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-64 h-44 bg-gray-100 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-gray-500 px-4">
        {error}. Enable location to see nearby treks 🌍
      </div>
    );
  }

  if (treks.length === 0) {
    return (
      <div className="text-sm text-gray-500 px-4">
        No treks found near your location yet.
      </div>
    );
  }

  return (
    <>
      {treks.map((trek) => (
        <FeaturedTrekCard
          key={trek._id}
          image={trek.photos?.[0]?.url}
          title={trek.title}
          days={`${trek.duration.days}D • ${trek.duration.nights}N`}
          level={trek.difficulty}
          price={`₹${trek.price.perPerson}`}
          location={`${trek.location.city}, ${trek.location.state}`}
        />
      ))}
    </>
  );
};

export default NearbyTreks;
