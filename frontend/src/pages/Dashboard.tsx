import { Outlet } from "react-router";

export function Dashboard() {
  return (
    <div className="p-4 flex">
      <Outlet />
    </div>
  );
}
