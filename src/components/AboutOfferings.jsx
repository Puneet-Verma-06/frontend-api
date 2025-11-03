import React from "react";

export default function AboutOfferings() {
  const cards = [
    {
      title: "Adikelash Trek",
      video: "/videos/glimpse-1.MOV",
      color: "text-orange-500",
      desc: "A refreshing balance of comfort and minimalism for the modern traveler.",
      offset: "-translate-y-12",
    },
    {
      title: "Tungnath Trek",
      video: "/videos/glimpse-3.MOV",
      color: "text-orange-500",
      desc: "Designed to energize your stay with dynamic colors and playful vibes.",
      offset: "translate-y-4",
    },
    {
      title: "Supra Trek",
      video: "/videos/glimpse-5.MOV",
      color: "text-pink-600",
      desc: "Savor delightful global cuisines made to satisfy every craving, all day long.",
      offset: "-translate-y-12",
    },
    {
      title: "Intuitive and High Energy",
      video: "/videos/glimpse-6.MOV",
      color: "text-pink-600",
      desc: "Our team’s warmth and energy ensure every stay feels effortless and memorable.",
      offset: "translate-y-4",
    },
    {
      title: "Thoughtful Amenities",
      video: "/videos/glimpse-7.MOV",
      color: "text-orange-500",
      desc: "Smart features and heartfelt touches crafted for your comfort and ease.",
      offset: "-translate-y-12",
    },
    {
      title: "Convenient Locations",
      video: "/videos/glimpse-2.MOV",
      color: "text-orange-500",
      desc: "Stay connected to what matters most — business, leisure, and beyond.",
      offset: "translate-y-4",
    },
  ];

  return (
    <div className="bg-white text-center py-14 px-6">
      {/* ====== About Section ====== */}
      <section className="max-w-4xl mx-auto mb-24">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0a1d4d] mb-6">
          Curious About Athithya?
        </h2>
        <p className="text-lg italic text-[#8b5e3c] leading-relaxed">
          “At its core, Athithya is a travel experience platform that seamlessly
          combines the warmth of local hosting with the interactivity of social
          media, offering travel enthusiasts like you a complete, meaningful and
          immersive traveling experience.”
        </p>
      </section>

      {/* ====== Offerings Section ====== */}
      <section className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`group flex flex-col items-center text-center cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.45,0,0.25,1)] ${card.offset}`}
            >
              {/* Video Card */}
              <div className="relative transform-gpu w-52 h-64 overflow-hidden rounded-full shadow-lg transition-all duration-700 ease-[cubic-bezier(0.45,0,0.25,1)] group-hover:rounded-4xl group-hover:w-56 group-hover:h-64 group-hover:scale-[1.02]">
                <video
                  src={card.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.45,0,0.25,1)] group-hover:scale-105"
                ></video>
              </div>

              {/* Title */}
              <h3
                className={`mt-4 text-lg font-semibold ${card.color} transition-all duration-300`}
              >
                {card.title}
              </h3>

              {/* Description */}
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-700 text-sm text-gray-700 max-w-[220px] mt-2 leading-relaxed">
                <div
                  className={`w-2 h-2 ${
                    card.color.includes("pink") ? "bg-pink-600" : "bg-orange-500"
                  } rounded-full mx-auto mb-2`}
                ></div>
                {card.desc}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
