import { Outlet } from "react-router";

export function Dashboard() {
  return (
    <div className="p-4 flex">
      <div className="flex-1 p-4 border-l">
        <Outlet />
      </div>
    </div>
  );
}
