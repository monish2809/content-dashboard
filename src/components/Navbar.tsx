"use client";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setTheme } from "@/features/userPreferences/userSlice";

const themeOptions = [
  { label: "Light", value: "light", text: "text-gray-900", bg: "bg-gray-50" },
  { label: "Dark", value: "dark", text: "text-gray-100", bg: "bg-gray-900" },
  {
    label: "Indigo",
    value: "indigo",
    text: "text-indigo-300",
    bg: "bg-indigo-900",
  },
];

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.user.theme);
  const themeObj =
    themeOptions.find((t) => t.value === theme) || themeOptions[0];

  return (
    <nav
      className={`${themeObj.bg} p-4 shadow-md flex justify-between items-center transition-colors duration-300`}
    >
      <h1 className={`text-2xl font-bold ${themeObj.text}`}>
        Content Dashboard
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-500 text-sm">Theme: {themeObj.label}</span>
        <select
          value={theme}
          onChange={(e) => dispatch(setTheme(e.target.value))}
          className="p-2 rounded-md border border-indigo-700 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {themeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <FaUserCircle className="text-3xl text-gray-400" />
      </div>
    </nav>
  );
};

export default Navbar;
