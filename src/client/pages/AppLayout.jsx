import { Outlet } from "react-router-dom";
import NavBar from "../ui/NavBar";

function AppLayout() {
  return (
    <div className="app-background grid grid-rows-[auto_1fr]">
      <header>
        <NavBar />
      </header>

      <main className="min-h-0">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
