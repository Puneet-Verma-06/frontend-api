import { useState, useMemo } from "react";

const GUEST_TABS = [
  { key: "posts", label: "Posts" },
  { key: "itineraries", label: "Itineraries" },
];

export default function GuestProfile({ posts }) {
  const [activeTab, setActiveTab] = useState("posts");

  const filteredPosts = useMemo(() => {
    if (activeTab === "posts")
      return posts.filter((p) => p.postType === "experience");

    if (activeTab === "itineraries")
      return posts.filter((p) => p.postType === "itinerary");

    return [];
  }, [activeTab, posts]);

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex gap-6 border-b">
        {GUEST_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`pb-2 font-medium ${
              activeTab === t.key
                ? "border-b-2 border-yellow-500 text-yellow-600"
                : "text-gray-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {filteredPosts.length === 0 && (
          <div className="text-gray-400 text-sm">Nothing here yet</div>
        )}

        {filteredPosts.map((p) => (
          <div key={p._id} className="border p-3 rounded">
            {p.title}
          </div>
        ))}
      </div>
    </div>
  );
}
