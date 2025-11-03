import React, { useRef, useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "keen-slider/keen-slider.min.css";
import "../styles/heroText.css"; 

const slides = [
  {
    id: 1,
    // video: "/videos/vid-1.mp4",
    images: ["/images/img-1.png", "/images/img-2.png", "/images/img-3.png"],
  },
  {
    id: 2,
    // video: "/videos/vid-1.mp4",
    images: ["/images/img-1.png", "/images/img-2.png", "/images/img-3.png"],
  },
  {
    id: 3,
    // video: "/videos/vid-1.mp4",
    images: ["/images/img-1.png", "/images/img-2.png", "/images/img-3.png"],
  },
];

export default function VideoCarousel() {
  const [current, setCurrent] = useState(0);

  // autoplay plugin (20s)
  const autoplay = (slider) => {
    let timeout;
    let mouseOver = false;
    const next = () => {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => slider.next(), 20000);
    };
    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => (mouseOver = true));
      slider.container.addEventListener("mouseout", () => (mouseOver = false));
      next();
    });
    slider.on("dragStarted", () => clearTimeout(timeout));
    slider.on("animationEnded", next);
    slider.on("updated", next);
    return () => clearTimeout(timeout);
  };

  const [sliderRef, slider] = useKeenSlider(
    {
      initial: 0,
      loop: true,
      slides: { origin: "center", perView: 1 },
      created(s) {
        setCurrent(s.track.details.rel);
      },
      slideChanged(s) {
        setCurrent(s.track.details.rel);
      },
    },
    [autoplay]
  );

  // Play only the current slide's video
  useEffect(() => {
    if (!slider?.current) return;
    const s = slider.current;
    const idx = s.track.details.rel;
    const containers = document.querySelectorAll(".video-slide");
    containers.forEach((c, i) => {
      const v = c.querySelector("video");
      if (!v) return;
      if (i === idx) {
        v.play().catch(() => {});
      } else {
        v.pause();
        try {
          v.currentTime = 0;
        } catch {}
      }
    });
  }, [current, slider]);

  const moveTo = (idx) => slider?.current?.moveToIdx(idx);

  return (
    <section className="relative w-full h-screen">
      <div ref={sliderRef} className="keen-slider h-full">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="keen-slider__slide video-slide relative w-full h-screen"
            aria-label={`Slide ${i + 1}`}
          >
            {/* Video */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={s.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />

            {/* Correct Tailwind gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />

            {/* Hero text (centered & cinematic) */}
            <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
              {/* fade-sequence uses CSS and will animate only when this slide is active */}
              <div
                className={`space-y-4 fade-sequence ${
                  current === i ? "active-slide" : "inactive-slide"
                }`}
              >
                <h2 className="hero-sub text-white/80 text-lg md:text-2xl tracking-wider font-light uppercase">
                  Feel the Experience
                </h2>

                <h1 className="hero-main text-white text-4xl md:text-6xl font-extrabold leading-tight">
                  Coz{" "}
                  <span className="text-gradient-gold italic">“You Only Live Once”</span>
                </h1>

                <p className="hero-tag text-white/70 text-sm md:text-lg tracking-wide max-w-xl mx-auto">
                  Discover stories, connect with creators, and live the golden moment.
                </p>
              </div>

              {/* Thumbnails row */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6">
                <div className="grid grid-cols-3 gap-8 place-items-center">
                  {s.images.map((img, idx) => (
                    <div key={idx} className="p-3 bg-white/5 border border-white/20 rounded-lg shadow-sm">
                      <img src={img} alt={`thumb-${i}-${idx}`} className="w-40 h-28 object-cover rounded-md" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* arrows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="max-w-8xl mx-auto h-full px-6 flex items-center justify-between">
          <button
            onClick={() => slider?.current?.prev()}
            className="pointer-events-auto hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-md transition"
            aria-label="Previous"
          >
            <FiChevronLeft size={20} />
          </button>

          <button
            onClick={() => slider?.current?.next()}
            className="pointer-events-auto hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-md transition"
            aria-label="Next"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-30 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => moveTo(idx)}
            className={`w-3 h-3 rounded-full transition-transform transform ${
              current === idx ? "scale-125 bg-brandGold" : "bg-white/50 hover:scale-110"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
