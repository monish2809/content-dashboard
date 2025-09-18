import axios from 'axios';

export const fetchNews = async (category: string, page: number) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        category,
        page,
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    throw new Error('Failed to fetch news');
  }
};