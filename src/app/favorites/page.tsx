"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { removeFavorite } from "@/features/favorites/favoritesSlice";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
// Removed Next.js Image import

const Favorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.favorites);
  const [category, setCategory] = React.useState("all");

  // Only show valid Content Preferences
  // Map dropdown categories to type values
  const categories = [
    { label: "Technology", value: "news" },
    { label: "Sports", value: "social" },
    { label: "Movies", value: "movie" },
  ];

  // Filter items by selected category
  const filteredItems =
    category === "all" ? items : items.filter((item) => item.type === category);

  // Remove all favorites for selected category
  const handleRemoveAll = () => {
    if (filteredItems.length === 0) return;
    filteredItems.forEach((item) => dispatch(removeFavorite(item.id)));
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-900">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-indigo-300">Favorites</h2>
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label className="text-indigo-200 font-semibold">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 rounded-md bg-gray-800 border border-indigo-700 text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end mb-4">
            <button
              onClick={handleRemoveAll}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-red-600 to-red-800 text-red-100 font-semibold shadow hover:from-red-700 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-red-400 transition flex items-center justify-center gap-2 text-base sm:text-lg"
              disabled={filteredItems.length === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="truncate">Remove All</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.length === 0 && (
              <p className="text-indigo-200">No favorites added yet.</p>
            )}
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className="bg-gray-800 p-4 rounded-lg shadow-md border border-indigo-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md mb-2"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold text-indigo-200">
                  {item.title}
                </h3>
                <p className="text-indigo-200">{item.description}</p>
                <button
                  onClick={() => dispatch(removeFavorite(item.id))}
                  className="mt-2 w-full sm:w-auto px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-indigo-800 text-indigo-100 font-semibold shadow hover:from-indigo-700 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition flex items-center justify-center gap-2 text-base sm:text-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span className="truncate">Remove from Favorites</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
