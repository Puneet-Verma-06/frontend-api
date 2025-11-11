import React from "react";
import {
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiBookmark,
  FiMoreHorizontal,
} from "react-icons/fi";

export default function InstaCard({
  username = "your_username",
  place = "Dehradun, India",
  image = "https://placehold.co/300x300?text=Your+Image+Here",
  likes = "1,000",
  caption = "Sample caption #templates",
  daysAgo = 2,
  profile = "https://placehold.co/30x30?text=👤",
}) {
  return (
    <div className="max-w-[250px] w-full bg-white rounded-lg shadow-sm overflow-hidden border border-[#C59A2F] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <img
            src={profile}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-gray-900 text-xs">
              {username}
            </span>
            <span className="text-gray-500 text-[10px]">{place}</span>
          </div>
        </div>
        <FiMoreHorizontal className="text-gray-600 text-sm cursor-pointer" />
      </div>

      {/* Image */}
      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt="post"
          className="w-full h-full object-cover select-none"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2 text-lg">
          <FiHeart className="cursor-pointer hover:text-red-500 transition" />
        </div>
        <FiBookmark className="cursor-pointer text-lg hover:text-yellow-500 transition" />
      </div>

      {/* Caption & Info */}
      <div className="px-3 pb-3 text-xs">
        <p className="font-semibold text-gray-800">{likes} likes</p>
        <p className="text-gray-700 truncate">{caption}</p>
        <p className="text-gray-400 text-[10px] mt-1">{daysAgo} DAYS AGO</p>
      </div>
    </div>
  );
}
