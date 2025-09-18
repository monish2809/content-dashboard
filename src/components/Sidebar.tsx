"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const themeClasses = {
  light: "bg-gray-100 text-gray-900",
  dark: "bg-gray-800 text-gray-100",
  indigo: "bg-indigo-900 text-indigo-100",
  emerald: "bg-emerald-900 text-emerald-100",
};

const Sidebar = () => {
  const pathname = usePathname();
  const theme = useSelector((state: RootState) => state.user.theme);
  const sidebarClass = themeClasses[theme] || themeClasses.light;

  return (
    <aside
      className={`${sidebarClass} w-64 p-4 h-screen fixed transition-colors duration-300`}
    >
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className={`block p-2 rounded-md ${
                pathname === "/dashboard"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/favorites"
              className={`block p-2 rounded-md ${
                pathname === "/favorites"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
              }`}
            >
              Favorites
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
