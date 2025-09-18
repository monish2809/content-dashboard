import { configureStore } from '@reduxjs/toolkit';
import contentReducer from '@/features/content/contentSlice';
import userReducer from '@/features/userPreferences/userSlice';
import favoritesReducer from '@/features/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    user: userReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;