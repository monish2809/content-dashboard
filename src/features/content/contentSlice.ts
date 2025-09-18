import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNews } from "@/services/newsAPI";
import { fetchMovies } from "@/services/tmdbAPI";
import { fetchSocialPosts } from "@/services/socialAPI";

interface ContentState {
  news: any[];
  movies: any[];
  social: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  news: [],
  movies: [],
  social: [],
  loading: false,
  error: null,
};

export const fetchNewsContent = createAsyncThunk(
  "content/fetchNews",
  async ({ category, page }: { category: string; page: number }) => {
    return await fetchNews(category, page);
  }
);

export const fetchMoviesContent = createAsyncThunk(
  "content/fetchMovies",
  async ({ category, page }: { category: string; page: number }) => {
    return await fetchMovies(category, page);
  }
);

export const fetchSocialContent = createAsyncThunk(
  "content/fetchSocial",
  async ({ hashtag, page }: { hashtag: string; page: number }) => {
    return await fetchSocialPosts(hashtag, page);
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsContent.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNewsContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news";
      })
      .addCase(fetchMoviesContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoviesContent.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMoviesContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      })
      .addCase(fetchSocialContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSocialContent.fulfilled, (state, action) => {
        state.loading = false;
        state.social = action.payload;
      })
      .addCase(fetchSocialContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch social posts";
      });
  },
});

export default contentSlice.reducer;
