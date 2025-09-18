'use client';
import { useState } from 'react';
import { debounce } from '@/utils/debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search content..."
      value={query}
      onChange={handleChange}
      className="p-2 border rounded-md w-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
    />
  );
};

export default SearchBar;