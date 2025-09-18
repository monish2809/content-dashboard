'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeFavorites } from '@/features/favorites/favoritesSlice';

const FavoritesInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      dispatch(initializeFavorites(savedFavorites));
    }
  }, [dispatch]);

  return null;
};

export default FavoritesInitializer;