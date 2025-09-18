import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  preferences: { category: string };
  darkMode: boolean;
}

const getInitialPreferences = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("preferences");
    if (stored) return JSON.parse(stored);
  }
  return { category: "technology" };
};

const getInitialDarkMode = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("darkMode");
    if (stored) return JSON.parse(stored);
  }
  return false;
};

const initialState: UserState = {
  preferences: getInitialPreferences(),
  darkMode: getInitialDarkMode(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPreferences(state, action) {
      state.preferences = action.payload;
      localStorage.setItem("preferences", JSON.stringify(action.payload));
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
  },
});

export const { setPreferences, toggleDarkMode } = userSlice.actions;
export default userSlice.reducer;
