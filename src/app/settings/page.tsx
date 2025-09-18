'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setPreferences } from '@/features/userPreferences/userSlice';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { preferences } = useSelector((state: RootState) => state.user);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPreferences({ category: e.target.value }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Settings</h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Content Preferences</h3>
            <select
              value={preferences.category}
              onChange={handleCategoryChange}
              className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value="technology">Technology</option>
              <option value="sports">Sports</option>
              <option value="movies">Movies</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;