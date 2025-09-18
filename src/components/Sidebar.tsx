'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-gray-100 dark:bg-gray-800 w-64 p-4 h-screen fixed">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className={`block p-2 rounded-md ${pathname === '/dashboard' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white'}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/favorites"
              className={`block p-2 rounded-md ${pathname === '/favorites' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white'}`}
            >
              Favorites
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className={`block p-2 rounded-md ${pathname === '/settings' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white'}`}
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;