Personalized Content Dashboard
A dynamic, interactive dashboard built with Next.js, TypeScript, Redux Toolkit, Tailwind CSS, Framer Motion, and React DnD. The app fetches personalized content from NewsAPI and TMDB API, supports drag-and-drop card reordering, dark mode, debounced search, infinite scrolling, and favorites management.
Features

Personalized Feed: News (NewsAPI), movies (TMDB), and mock social posts based on user-selected categories (technology, sports, finance).
Infinite Scrolling: Loads more content as the user scrolls.
Drag-and-Drop: Reorder content cards using React DnD.
Dark Mode: Toggle between light and dark themes.
Debounced Search: Search across content with optimized performance.
Favorites: Add/remove content to a favorites section.
State Management: Redux Toolkit for global state, persisted with localStorage.
Testing: Unit tests (Jest), integration tests, and E2E tests (Cypress).

Setup Instructions

Clone the repository:git clone https://github.com/yourusername/personalized-content-dashboard.git
cd personalized-content-dashboard


Install dependencies:npm install


Create a .env.local file in the root directory:NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key


Obtain keys from NewsAPI and TMDB.


Run the development server:npm run dev


Open http://localhost:3000 in your browser (redirects to /dashboard).

Running Tests

Unit and integration tests:npm run test


E2E tests (Cypress):npm run cypress:open



Project Structure

src/app/: Next.js pages (dashboard, favorites, settings).
src/components/: Reusable UI components (Card, Navbar, Sidebar, SearchBar).
src/features/: Redux slices for user preferences, content, and favorites.
src/services/: API service functions for NewsAPI, TMDB, and mock social API.
src/store/: Redux store and provider.
src/styles/: Global CSS with Tailwind.
src/utils/: Utility functions (debounce).
src/tests/: Unit, integration, and E2E tests.

User Flow

Visit /dashboard for the main feed with news, movies, and social posts.
Use the sidebar to navigate to /favorites or /settings.
Select a category in settings to update content.
Search content using the debounced search bar.
Drag and drop cards to reorder them.
Add/remove content to favorites.
Toggle dark mode via the navbar.
Scroll to load more content.

Live Demo
[Link to live demo (e.g., Vercel, if hosted)]
Notes

Social media API is mocked; replace with Twitter/Instagram API if available.
Extend with bonus features (authentication, real-time updates, i18n) as needed.
Deploy to Vercel/Netlify for a live demo.

Demo Video
[Link to demo video showcasing the app]