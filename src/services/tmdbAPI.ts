import axios from 'axios';

export const fetchMovies = async (category: string, page: number) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        page,
        with_genres: category === 'technology' ? 878 : category === 'sports' ? 10540 : 80,
      },
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
};