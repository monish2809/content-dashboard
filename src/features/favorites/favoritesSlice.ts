import { createSlice } from '@reduxjs/toolkit';

interface FavoriteItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  type: 'news' | 'movie' | 'social';
  url?: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    initializeFavorites(state, action) {
      state.items = action.payload;
    },
    addFavorite(state, action) {
      const item = action.payload;
      if (!state.items.some((existingItem) => existingItem.id === item.id)) {
        state.items.push(item);
        if (typeof window !== 'undefined') {
          localStorage.setItem('favorites', JSON.stringify(state.items));
        }
      }
    },
    removeFavorite(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
  },
});

export const { initializeFavorites, addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;