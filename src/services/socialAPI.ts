// Mock social media API (replace with Twitter/Instagram API if available)
export const fetchSocialPosts = async (hashtag: string, page: number) => {
  // Mock data
  return [
    {
      id: `${hashtag}-${page}-1`,
      text: `Sample post about ${hashtag}`,
      image: '/placeholder.jpg',
      url: '#',
    },
    {
      id: `${hashtag}-${page}-2`,
      text: `Another post about ${hashtag}`,
      image: '/placeholder.jpg',
      url: '#',
    },
  ];
};