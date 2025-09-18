import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  preferences: { category: string };
  darkMode: boolean;
}

const initialState: UserState = {
  preferences: { category: 'technology' },
  darkMode: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPreferences(state, action) {
      state.preferences = action.payload;
      localStorage.setItem('preferences', JSON.stringify(action.payload));
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
  },
});

export const { setPreferences, toggleDarkMode } = userSlice.actions;
export default userSlice.reducer;