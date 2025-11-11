import React, { useRef, useEffect } from "react";
import Carousel from "../components/Carousel";
import InstaCard from "../components/cards/InstaCard";
import SearchBar from "../components/Search";
import ForYouCard from "../components/cards/ForYouCard";
import { FaArrowRightLong } from "react-icons/fa6";

export const Explore = () => {
  // ----- Explore Top Posts marquee refs -----
  const scrollRef = useRef(null);
  const contentRef = useRef(null);
  const rafRef = useRef(null);
  const cycleWidthRef = useRef(0);

  // ----- For You marquee refs -----
  const fyScrollRef = useRef(null);
  const fyContentRef = useRef(null);
  const fyRafRef = useRef(null);
  const fyCycleWidthRef = useRef(0);

  const cards = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpVJ3AZKPgdD20O1nXIaD0hHRweL7V_nkiFA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpVJ3AZKPgdD20O1nXIaD0hHRweL7V_nkiFA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpVJ3AZKPgdD20O1nXIaD0hHRweL7V_nkiFA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpVJ3AZKPgdD20O1nXIaD0hHRweL7V_nkiFA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpVJ3AZKPgdD20O1nXIaD0hHRweL7V_nkiFA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpVJ3AZKPgdD20O1nXIaD0hHRweL7V_nkiFA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpVJ3AZKPgdD20O1nXIaD0hHRweL7V_nkiFA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpVJ3AZKPgdD20O1nXIaD0hHRweL7V_nkiFA&s",
  ];

  // For You data (ratings as numbers)
  const forYou = [
    {
      title: "Himalayan Retreat",
      description: "Glass cabin with panoramic peaks + bonfire & breakfast.",
      image:
        "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1600&auto=format&fit=crop",
      rating: 4.9,
      nights: 2,
    },
    {
      title: "Forest Hideaway",
      description: "Quiet cottage near riverside trails, perfect for WFH.",
      image:
        "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=1600&auto=format&fit=crop",
      rating: 4.7,
      nights: 3,
    },
    {
      title: "City Luxe Loft",
      description: "Downtown premium loft with skyline view & gym access.",
      image:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
      rating: 4.8,
      nights: 1,
    },
    {
      title: "Lakeside Villa",
      description: "Private deck, canoeing, and sunrise breakfasts.",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop",
      rating: 4.6,
      nights: 2,
    },
  ];

  // --- Explore Top Posts marquee ---
  useEffect(() => {
    const container = scrollRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const cycles = Array.from(content.querySelectorAll("[data-cycle]"));
    if (cycles.length < 2) return;

    const rect0 = cycles[0].getBoundingClientRect();
    const rect1 = cycles[1].getBoundingClientRect();
    const oneCycleWidth = Math.round(rect1.left - rect0.left);
    cycleWidthRef.current = Math.max(oneCycleWidth, 1);

    container.scrollLeft = cycleWidthRef.current;

    let speedPxPerSec = 25;
    let lastTs = 0;
    let paused = false;

    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("focusin", onEnter);
    container.addEventListener("focusout", onLeave);

    const tick = (ts) => {
      if (!lastTs) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      if (!paused) {
        container.scrollLeft += speedPxPerSec * dt;
        if (container.scrollLeft >= cycleWidthRef.current * 2) {
          container.scrollLeft -= cycleWidthRef.current;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onResize = () => {
      if (cycles.length >= 2) {
        const r0 = cycles[0].getBoundingClientRect();
        const r1 = cycles[1].getBoundingClientRect();
        cycleWidthRef.current =
          Math.round(r1.left - r0.left) || cycleWidthRef.current;
        container.scrollLeft = cycleWidthRef.current;
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("focusin", onEnter);
      container.removeEventListener("focusout", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // --- For You marquee (gentler speed, vertical overflow visible) ---
  useEffect(() => {
    const container = fyScrollRef.current;
    const content = fyContentRef.current;
    if (!container || !content) return;

    const cycles = Array.from(content.querySelectorAll("[data-fy-cycle]"));
    if (cycles.length < 2) return;

    const rect0 = cycles[0].getBoundingClientRect();
    const rect1 = cycles[1].getBoundingClientRect();
    const oneCycleWidth = Math.round(rect1.left - rect0.left);
    fyCycleWidthRef.current = Math.max(oneCycleWidth, 1);

    container.scrollLeft = fyCycleWidthRef.current;

    let speedPxPerSec = 25;
    let lastTs = 0;
    let paused = false;

    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("focusin", onEnter);
    container.addEventListener("focusout", onLeave);

    const tick = (ts) => {
      if (!lastTs) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      if (!paused) {
        container.scrollLeft += speedPxPerSec * dt;
        if (container.scrollLeft >= fyCycleWidthRef.current * 2) {
          container.scrollLeft -= fyCycleWidthRef.current;
        }
      }
      fyRafRef.current = requestAnimationFrame(tick);
    };

    fyRafRef.current = requestAnimationFrame(tick);

    const onResize = () => {
      if (cycles.length >= 2) {
        const r0 = cycles[0].getBoundingClientRect();
        const r1 = cycles[1].getBoundingClientRect();
        fyCycleWidthRef.current =
          Math.round(r1.left - r0.left) || fyCycleWidthRef.current;
        container.scrollLeft = fyCycleWidthRef.current;
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("focusin", onEnter);
      container.removeEventListener("focusout", onLeave);
      if (fyRafRef.current) cancelAnimationFrame(fyRafRef.current);
    };
  }, []);

  return (
    <>
      {/* Hero Carousel */}
      <div className="relative w-full h-[360px] md:h-[360px]">
        <Carousel />
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
          <div className="pointer-events-auto w-11/12 md:w-3/5 lg:w-1/2 mb-16">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Explore Strip */}
      <section className="py-10">
        <div className="mx-8 px-4 relative">
          <div className="flex justify-between">
            <h2
              className="text-start italic text-3xl font-semibold text-gray-800 mb-6"
              style={{ color: "#C59A2F" }}
            >
              Explore Top Posts
            </h2>
            <button className=" gold-cta-x h-10 relative inline-flex items-center px-5 py-2 rounded-sm font-medium transition-all duration-300 bg-[#C59A2F] text-white shadow-lg cursor-pointer">
              Explore All
            </button>
          </div>

          <div
            ref={scrollRef}
            className="overflow-x-auto overflow-y-hidden px-2"
            style={{ scrollbarWidth: "none" }}
          >
            <div ref={contentRef} className="flex gap-3 items-stretch">
              {[0, 1, 2].map((cycle) => (
                <div
                  key={cycle}
                  data-cycle
                  className="flex gap-3 items-stretch"
                >
                  {cards.map((img, i) => (
                    <div
                      key={`${cycle}-${i}`}
                      data-card
                      className="shrink-0 w-[260px]"
                    >
                      <div className="mx-auto max-w-[260px]">
                        <InstaCard
                          image={img}
                          username={`user_${i + 1}`}
                          place="Mothrowala, Dehradun"
                          caption="Exploring new designs #UI"
                          likes={(1000 + i * 200).toLocaleString()}
                          comments={50 + i}
                          daysAgo={i + 1}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 ">
        <div className="mx-8 px-4">
          <div className="flex justify-between">
            <h2
              className="text-start italic text-3xl font-semibold text-gray-800 mb-6"
              style={{ color: "#C59A2F" }}
            >
              For You
            </h2>
            <button className=" gold-cta-x h-10 relative inline-flex items-center px-5 py-2 rounded-sm font-medium transition-all duration-300 bg-[#C59A2F] text-white shadow-lg cursor-pointer">
              Explore All
            </button>
          </div>
          <div
            ref={fyScrollRef}
            className="overflow-x-auto px-2 py-4"
            style={{
              scrollbarWidth: "none",
              overflowY: "visible",
            }}
          >
            <div ref={fyContentRef} className="flex gap-5 items-stretch">
              {[0, 1, 2].map((cycle) => (
                <div
                  key={cycle}
                  data-fy-cycle
                  className="flex gap-5 items-stretch"
                >
                  {forYou.map((item, idx) => (
                    <ForYouCard
                      key={`${cycle}-${idx}`}
                      title={item.title}
                      description={item.description}
                      image={item.image}
                      rating={item.rating}
                      nights={item.nights}
                      onClick={() => console.log("Reserve:", item.title)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="mx-8 px-4">
          <div className="flex justify-between">
            <h2
              className="text-start italic text-3xl font-semibold text-gray-800 mb-6"
              style={{ color: "#C59A2F" }}
            >
              Nearby You
            </h2>
            <button className=" gold-cta-x h-10 relative inline-flex items-center px-5 py-2 rounded-sm font-medium transition-all duration-300 bg-[#C59A2F] text-white shadow-lg cursor-pointer">
              Explore All
            </button>
          </div>

          <div
            ref={fyScrollRef}
            className="overflow-x-auto px-2 py-4"
            style={{
              scrollbarWidth: "none",
              overflowY: "visible",
            }}
          >
            <div ref={fyContentRef} className="flex gap-5 items-stretch">
              {[0, 1, 2].map((cycle) => (
                <div
                  key={cycle}
                  data-fy-cycle
                  className="flex gap-5 items-stretch"
                >
                  {forYou.map((item, idx) => (
                    <ForYouCard
                      key={`${cycle}-${idx}`}
                      title={item.title}
                      description={item.description}
                      image={item.image}
                      rating={item.rating}
                      nights={item.nights}
                      onClick={() => console.log("Reserve:", item.title)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-center mb-10">
        <button className="gold-cta-x h-12 relative inline-flex items-center px-32 py-3 rounded-sm font-medium transition-all duration-300 bg-[#C59A2F] text-white shadow-lg cursor-pointer">
          Be a Host{" "}
          <span className="ml-2">
            <FaArrowRightLong />
          </span>
        </button>
      </div>

      {/* Hide scrollbars & respect reduced motion */}
      <style>{`
        .overflow-x-auto::-webkit-scrollbar { display: none; }
        .overflow-x-auto { -ms-overflow-style: none; scrollbar-width: none; }
        @media (prefers-reduced-motion: reduce) {
          .overflow-x-auto { scroll-behavior: auto; }
        }
      `}</style>
    </>
  );
};

export default Explore;
