import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  preferences: { category: string };
  theme: string;
}

const getInitialPreferences = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("preferences");
    if (stored) return JSON.parse(stored);
  }
  return { category: "technology" };
};

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme");
    if (stored) return stored;
  }
  return "light";
};

const initialState: UserState = {
  preferences: getInitialPreferences(),
  theme: getInitialTheme(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPreferences(state, action) {
      state.preferences = action.payload;
      localStorage.setItem("preferences", JSON.stringify(action.payload));
    },
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setPreferences, setTheme } = userSlice.actions;
export default userSlice.reducer;
