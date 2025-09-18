'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { toggleDarkMode } from '@/features/userPreferences/userSlice';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { darkMode } = useSelector((state: RootState) => state.user);

  return (
    <nav className="bg-white dark:bg-gray-900 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold dark:text-white">Content Dashboard</h1>
      <button
        onClick={() => dispatch(toggleDarkMode())}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;