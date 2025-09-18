"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchNewsContent,
  fetchMoviesContent,
  fetchSocialContent,
} from "@/features/content/contentSlice";
import { addFavorite } from "@/features/favorites/favoritesSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import Card from "@/components/Card";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  type: "news" | "movie" | "social";
  url?: string;
}

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, movies, social, loading, error } = useSelector(
    (state: RootState) => state.content
  );
  const { preferences } = useSelector((state: RootState) => state.user);
  const categories = ["technology", "sports", "movies"];
  const [selectedCategory, setSelectedCategory] = useState(
    preferences.category
  );
  useEffect(() => {
    if (selectedCategory !== preferences.category) {
      dispatch({
        type: "user/setPreferences",
        payload: { category: selectedCategory },
      });
    }
  }, [selectedCategory, dispatch, preferences.category]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const moveCard = (from: number, to: number) => {
    const newContent = [...content];
    const [movedItem] = newContent.splice(from, 1);
    newContent.splice(to, 0, movedItem);
    setContent(newContent);
  };

  useEffect(() => {
    dispatch(fetchNewsContent({ category: preferences.category, page }));
    dispatch(fetchMoviesContent({ category: preferences.category, page }));
    dispatch(fetchSocialContent({ hashtag: preferences.category, page }));
  }, [dispatch, preferences.category, page]);

  useEffect(() => {
    const filteredContent = [
      ...news.map((item, index) => ({
        id: `news-${item.url}-${index}`,
        title: item.title,
        description: item.description || "",
        image: item.urlToImage,
        type: "news" as const,
        url: item.url,
      })),
      ...movies.map((item, index) => ({
        id: `movie-${item.id}-${index}`,
        title: item.title,
        description: item.overview,
        image: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        type: "movie" as const,
        url: `https://www.themoviedb.org/movie/${item.id}`,
      })),
      ...social.map((item, index) => ({
        id: `social-${item.id}-${index}`,
        title: item.text,
        description: item.text,
        image: item.image,
        type: "social" as const,
        url: item.url,
      })),
    ].filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setContent(filteredContent);
  }, [news, movies, social, searchQuery, preferences.category]);
  const handleScroll = React.useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, handleScroll]);

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
    <DndProvider backend={HTML5Backend}>
      <div
        className={`flex min-h-screen ${bodyClass} transition-colors duration-500`}
      >
        <Sidebar />
        <div
          className={`flex-1 ml-64 flex flex-col ${bodyClass} transition-colors duration-500`}
        >
          <Navbar />
          <main
            className={`flex flex-col items-center justify-start p-8 ${bodyClass} transition-colors duration-500`}
          >
            <div className="w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <SearchBar onSearch={setSearchQuery} />
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <label className="text-indigo-200 font-semibold">
                  Category:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-2 rounded-md bg-gray-800 border border-indigo-700 text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence>
                {content.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 indigo:bg-indigo-800 rounded-xl shadow-lg p-6 flex flex-col items-start transition hover:scale-105 border border-indigo-300 dark:border-gray-700 indigo:border-indigo-700"
                    style={{
                      transition: "background 0.5s, color 0.5s, border 0.5s",
                    }}
                  >
                    <Card item={item} index={index} moveCard={moveCard} />
                    <button
                      onClick={() => {
                        // Map selectedCategory to correct type
                        let mappedType: "news" | "movie" | "social" = item.type;
                        if (selectedCategory === "technology")
                          mappedType = "news";
                        else if (selectedCategory === "sports")
                          mappedType = "social";
                        else if (selectedCategory === "movies")
                          mappedType = "movie";
                        dispatch(addFavorite({ ...item, type: mappedType }));
                      }}
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
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                      <span className="truncate">Add to Favorites</span>
                    </button>
                  </div>
                ))}
              </AnimatePresence>
            </motion.div>
            {loading && <div className="text-center mt-8">Loading...</div>}
            {error && (
              <div className="text-center mt-8 text-red-500">{error}</div>
            )}
          </main>
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;
