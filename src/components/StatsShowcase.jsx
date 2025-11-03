// components/StatsShowcase.jsx
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const ArrowPointingRight = ({ className = "", stroke = "#2b6cb0" }) => (
  <svg
    className={className}
    width="140"
    height="18"
    viewBox="0 0 140 18"
    fill="none"
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <marker id="arrowhead-right" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <path d="M0 0 L8 3 L0 6 z" fill={stroke} />
      </marker>
    </defs>
    <path
      d="M10 9 L130 9"
      stroke={stroke}
      strokeWidth="1.6"
      markerEnd="url(#arrowhead-right)"
      strokeLinecap="round"
    />
  </svg>
);

/* Right column: arrow should point LEFT (←) toward center */
const ArrowPointingLeft = ({ className = "", stroke = "#2b6cb0" }) => (
  <svg
    className={className}
    width="140"
    height="18"
    viewBox="0 0 140 18"
    fill="none"
    aria-hidden
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <marker id="arrowhead-left" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
        <path d="M8 0 L0 3 L8 6 z" fill={stroke} />
      </marker>
    </defs>
    <path
      d="M130 9 L10 9"
      stroke={stroke}
      strokeWidth="1.6"
      markerEnd="url(#arrowhead-left)"
      strokeLinecap="round"
    />
  </svg>
);

/* ---------- Main Component ---------- */
export default function StatsShowcaseImproved({
  mainTarget = 0,
  leftStat = 100,
  rightStat = 25,
  duration = 2.0,
  arrowStroke = "#2b6cb0", // default color (you can override)
}) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(mv, mainTarget, {
      duration,
      ease: [0.22, 0.8, 0.12, 1],
      onUpdate(value) {
        setDisplay(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [mainTarget, duration, mv]);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const entrance = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.6, ease: "easeOut" } },
  };

  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* top small label */}
        <motion.p initial="hidden" animate="show" variants={entrance} className="text-center text-sm font-medium text-sky-900">
          From
        </motion.p>

        {/* big animated number */}
        <motion.div
          initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          aria-live="polite"
          className="mt-6 text-center select-none"
        >
          <span
            className="font-extrabold leading-tight"
            style={{
              color: "#7f5f00",
              fontSize: "clamp(48px, 9vw, 120px)",
              lineHeight: 0.9,
              display: "inline-block",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {display}
          </span>
        </motion.div>

        {/* 'To' label */}
        <motion.p initial="hidden" animate="show" variants={entrance} className="mt-4 text-center text-sm text-sky-900">
          To
        </motion.p>

        {/* center block: left arrow & stat | center labels | right arrow & stat */}
        <div className="mt-10 relative flex items-center justify-between gap-6">
          {/* LEFT column (desktop): show number then arrow pointing right */}
          <div className="hidden sm:flex sm:items-center sm:justify-center sm:w-1/4">
            <div className="flex items-center gap-4">
              {/* number */}
              <div className="text-lg font-medium" style={{ color: "#7f5f00" }}>
                {leftStat}
              </div>

              {/* arrow pointing RIGHT toward center */}
              <div className="transform -translate-x-2">
                <ArrowPointingRight stroke={arrowStroke} />
              </div>
            </div>
          </div>

          {/* CENTER labels (stacked) */}
          <div className="w-full sm:w-1/2 text-center">
            <motion.div initial="hidden" animate="show" variants={entrance} className="flex flex-col items-center">
              <p className="text-lg sm:text-xl font-medium text-sky-900">No. of Happy Travelers</p>
              <p className="text-lg sm:text-xl font-medium mt-3 text-sky-900">No. of Satisfied Hosts</p>
              <p className="text-base sm:text-lg mt-4 text-gray-700 flex items-center gap-2 justify-center">
                And counting Smiles... <span className="text-2xl">😊</span>
              </p>
            </motion.div>
          </div>

          {/* RIGHT column (desktop): show arrow pointing left then number */}
          <div className="hidden sm:flex sm:items-center sm:justify-center sm:w-1/4">
            <div className="flex items-center gap-4">
              {/* arrow pointing LEFT toward center */}
              <div className="transform translate-x-2">
                <ArrowPointingLeft stroke={arrowStroke} />
              </div>

              {/* number */}
              <div className="text-lg font-medium" style={{ color: "#7f5f00" }}>
                {rightStat}
              </div>
            </div>
          </div>
        </div>

        {/* mobile-friendly stacked stats (when viewport is small) */}
        <div className="mt-8 sm:hidden flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="text-lg font-medium" style={{ color: "#7f5f00" }}>
              {leftStat}
            </div>
            {/* mobile arrow — pointing right toward center label */}
            <ArrowPointingRight className="w-20" stroke={arrowStroke} />
            <div className="text-sm text-sky-900 ml-3">Happy Travelers</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-sky-900">Satisfied Hosts</div>
            {/* mobile arrow — pointing left toward center label */}
            <ArrowPointingLeft className="w-20" stroke={arrowStroke} />
            <div className="text-lg font-medium" style={{ color: "#7f5f00" }}>
              {rightStat}
            </div>
          </div>
        </div>

        {/* quoted handwritten line */}
        <motion.blockquote
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: prefersReduced ? 0 : 0.7 }}
          className="mt-12 text-center text-2xl md:text-3xl text-[#8b5e3c] italic"
        >
          <span style={{ fontFamily: "'Great Vibes', cursive", display: "inline-block" }}>
            However "At the heart of it all, it's You & Us."
          </span>
        </motion.blockquote>
      </div>
    </section>
  );
}
