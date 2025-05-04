import { useNavigate } from "react-router";
import Button from "./button";
import SidebarItem from "./sidebarItem";
import {
  BookTextIcon,
  ListPlusIcon,
  LogOut,
  MoonStarIcon,
  SunIcon,
  User2Icon,
} from "lucide-react";
import { useTheme } from "../context/themeContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="w-[20%] h-full bg-primary text-white">
      {/* Title and Logo */}
      <div className="h-[10%] flex items-center justify-between px-8">
        <h1 className="text-lg font-bold">LMS APP</h1>
        {theme === "light" ? (
          <MoonStarIcon onClick={toggleTheme} className="cursor-pointer" />
        ) : (
          <SunIcon
            onClick={toggleTheme}
            color="yellow"
            className="cursor-pointer"
          />
        )}
      </div>

      {/* Menu Items */}
      <div className="flex flex-col w-full justify-between h-[90%]">
        <ul className="flex flex-col gap-4 w-full">
          <SidebarItem icon={<BookTextIcon />} to="/books" label="Books" />
          <SidebarItem icon={<User2Icon />} to="/members" label="Members" />
          <SidebarItem
            icon={<ListPlusIcon />}
            to="/transactions"
            label="Transactions"
          />
        </ul>
        <Button
          type="button"
          label="Logout"
          className="bg-white !text-black rounded-none py-4 cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          buttonIcon={<LogOut />}
        />
      </div>
    </aside>
  );
}
