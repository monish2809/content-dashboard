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

  const theme = useSelector((state: RootState) => state.user.theme);
  const themeBodyClasses: Record<string, string> = {
    light: "bg-gradient-to-br from-gray-50 via-white to-gray-200 text-gray-900",
    dark: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100",
    indigo:
      "bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-indigo-100",
  };
  const bodyClass =
    themeBodyClasses[theme as keyof typeof themeBodyClasses] ||
    themeBodyClasses.light;

  return (
    <div
      className={`flex min-h-screen ${bodyClass} transition-colors duration-500`}
    >
      <Sidebar />
      <div
        className={`flex-1 ml-64 ${bodyClass} transition-colors duration-500`}
      >
        <Navbar />
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-indigo-400 dark:text-indigo-300 indigo:text-indigo-200">
            Favorites
          </h2>
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <label className="text-indigo-400 dark:text-indigo-200 indigo:text-indigo-100 font-semibold">
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 indigo:bg-indigo-800 border border-indigo-400 dark:border-indigo-700 indigo:border-indigo-700 text-indigo-900 dark:text-indigo-200 indigo:text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end mb-6">
            <button
              onClick={handleRemoveAll}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-red-50 font-semibold shadow hover:from-red-600 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-red-400 transition flex items-center justify-center gap-2 text-base sm:text-lg"
              disabled={filteredItems.length === 0}
              style={{ transition: "background 0.5s, color 0.5s" }}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.length === 0 && (
              <p className="text-indigo-400 dark:text-indigo-200 indigo:text-indigo-100">
                No favorites added yet.
              </p>
            )}
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white dark:bg-gray-800 indigo:bg-indigo-800 rounded-xl shadow-lg p-6 flex flex-col items-start transition hover:scale-105 border border-indigo-300 dark:border-gray-700 indigo:border-indigo-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  transition: "background 0.5s, color 0.5s, border 0.5s",
                }}
              >
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md mb-2"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200 indigo:text-indigo-100">
                  {item.title}
                </h3>
                <p className="text-indigo-700 dark:text-indigo-200 indigo:text-indigo-100">
                  {item.description}
                </p>
                <button
                  onClick={() => dispatch(removeFavorite(item.id))}
                  className="mt-4 w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-700 text-indigo-50 font-semibold shadow hover:from-indigo-600 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition flex items-center justify-center gap-2 text-base sm:text-lg"
                  style={{ transition: "background 0.5s, color 0.5s" }}
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
