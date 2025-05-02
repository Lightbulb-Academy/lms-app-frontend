import { JSX } from "react";
import { NavLink } from "react-router";

interface SidebarItemProps {
  to: string;
  label: string;
  icon: JSX.Element;
}

export default function SidebarItem({ to, label, icon }: SidebarItemProps) {
  return (
    <li className="w-full px-4">
      <NavLink
        to={to}
        className={({ isActive }) =>
          ` items-center gap-2 w-full flex px-4 py-2 rounded-md text-white hover:text-black ${
            isActive
              ? "bg-white !text-primary hover:opacity-80"
              : "hover:bg-gray-100"
          }`
        }
      >
        {icon}
        <p className="text-xl">{label}</p>
      </NavLink>
    </li>
  );
}
