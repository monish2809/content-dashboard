import { Providers } from '@/store/provider';
import './globals.css';
import FavoritesInitializer from '@/components/FavoritesInitializer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <FavoritesInitializer />
          {children}
        </Providers>
      </body>
    </html>
  );
}