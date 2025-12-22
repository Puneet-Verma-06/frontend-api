import { useState, useMemo } from "react";

const HOST_TABS = [
  { key: "posts", label: "Posts" },
  { key: "itineraries", label: "Itineraries" },
  { key: "services", label: "Services" },
];

export default function HostProfile({ posts, postStats, reviewStats }) {
  const [activeTab, setActiveTab] = useState("posts");

  const filteredPosts = useMemo(() => {
    if (activeTab === "posts")
      return posts.filter((p) => p.postType === "experience");

    if (activeTab === "services")
      return posts.filter((p) => p.postType === "service");

    if (activeTab === "itineraries")
      return posts.filter((p) => p.postType === "itinerary");

    return [];
  }, [activeTab, posts]);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>Total: {postStats.total}</div>
        <div>Services: {postStats.services}</div>
        <div>Rating: ⭐ {reviewStats.averageRating}</div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b">
        {HOST_TABS.map((t) => (
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
          <div className="text-gray-400 text-sm">No items found</div>
        )}

        {filteredPosts.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg p-4 hover:bg-gray-50"
          >
            <h4 className="font-semibold">{p.title}</h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
