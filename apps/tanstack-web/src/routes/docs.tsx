import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/layout/Sidebar";

export const Route = createFileRoute("/docs")({
  component: () => (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 lg:ml-56 md:ml-48 min-w-0">
        <div className="px-8 py-10 lg:px-6 lg:py-8 md:px-4 md:py-6 max-w-3xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  ),
});
