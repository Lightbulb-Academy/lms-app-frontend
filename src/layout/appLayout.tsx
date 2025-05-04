import { Outlet } from "react-router";
import Sidebar from "../components/sidebar";
import { useTheme } from "../context/themeContext";

export default function AppLayout() {
  const { theme } = useTheme();
  console.log({ theme });

  return (
    <div className="w-screen h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      {/* content body */}
      <div className="w-[80%] h-full flex justify-center bg-[#9983ab56]">
        {/* Outlet renders the matching child route of a parent route
          parent route: "/" - AppLayout
          child routes: "/books", "/members", ...
        */}

        <Outlet />
      </div>
    </div>
  );
}
