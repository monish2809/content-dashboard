'use client';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { fetchNewsContent, fetchMoviesContent, fetchSocialContent } from '@/features/content/contentSlice';
import { addFavorite } from '@/features/favorites/favoritesSlice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import Card from '@/components/Card';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  type: 'news' | 'movie' | 'social';
  url?: string;
}

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, movies, social, loading, error } = useSelector((state: RootState) => state.content);
  const { preferences } = useSelector((state: RootState) => state.user);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchNewsContent({ category: preferences.category, page }));
    dispatch(fetchMoviesContent({ category: preferences.category, page }));
    dispatch(fetchSocialContent({ hashtag: preferences.category, page }));
  }, [dispatch, preferences.category, page]);

  useEffect(() => {
    const filteredContent = [
      ...news.map((item) => ({
        id: `news-${item.url}`,
        title: item.title,
        description: item.description || '',
        image: item.urlToImage,
        type: 'news' as const,
        url: item.url,
      })),
      ...movies.map((item) => ({
        id: `movie-${item.id}`,
        title: item.title,
        description: item.overview,
        image: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        type: 'movie' as const,
        url: `https://www.themoviedb.org/movie/${item.id}`,
      })),
      ...social.map((item) => ({
        id: `social-${item.id}`,
        title: item.text,
        description: item.text,
        image: item.image,
        type: 'social' as const,
        url: item.url,
      })),
    ].filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setContent(filteredContent);
  }, [news, movies, social, searchQuery]);

  const moveCard = (from: number, to: number) => {
    const newContent = [...content];
    const [movedItem] = newContent.splice(from, 1);
    newContent.splice(to, 0, movedItem);
    setContent(newContent);
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Navbar />
          <div className="p-6">
            <SearchBar onSearch={setSearchQuery} />
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence>
                {content.map((item, index) => (
                  <div key={item.id}>
                    <Card item={item} index={index} moveCard={moveCard} />
                    <button
                      onClick={() => dispatch(addFavorite(item))}
                      className="mt-2 text-blue-500 hover:underline"
                    >
                      Add to Favorites
                    </button>
                  </div>
                ))}
              </AnimatePresence>
            </motion.div>
            {loading && <div className="text-center mt-4">Loading...</div>}
            {error && <div className="text-center mt-4 text-red-500">{error}</div>}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;