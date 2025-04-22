import { NavLink } from "react-router";

export default function Sidebar() {
  return (
    <aside className="w-[20%] h-full bg-amber-200">
      {/* Title and Logo */}
      <div className="h-[10%] flex items-center justify-center">
        <h1 className="text-lg font-bold">LMS APP</h1>
      </div>

      {/* Menu Items */}
      <div className="w-full">
        <ul className="flex flex-col gap-1 w-full">
          <li className="w-full">
            <NavLink
              to="/books"
              className={({ isActive }) =>
                `w-full flex px-4 py-2 ${isActive ? "bg-black text-white" : ""}`
              }
            >
              Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/members"
              className={({ isActive }) =>
                `w-full flex px-4 py-2 ${isActive ? "bg-black text-white" : ""}`
              }
            >
              Members
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                `w-full flex px-4 py-2 ${isActive ? "bg-black text-white" : ""}`
              }
            >
              Transactions
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}
