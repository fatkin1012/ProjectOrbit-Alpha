"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import "./styles/globals.css";

import { queryClient } from "./lib/queryClient";
import { CalendarPage } from "./pages/CalendarPage";
import { DashboardPage } from "./pages/DashboardPage";
import { FocusPage } from "./pages/FocusPage";
import { HomePage } from "./pages/HomePage";
import { NotesPage } from "./pages/NotesPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { RemindersPage } from "./pages/RemindersPage";
import { RouteErrorPage } from "./pages/RouteErrorPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TaskViewPage } from "./pages/TaskViewPage";
import { TodayPage } from "./pages/TodayPage";
import { AppShell } from "./components/layout/AppShell";

export default function GrandOpeningRoot() {
  const router = useMemo(
    () =>
      createMemoryRouter([
        {
          path: "/",
          element: <HomePage />,
          errorElement: <RouteErrorPage />,
        },
        {
          path: "/settings",
          element: <SettingsPage />,
          errorElement: <RouteErrorPage />,
        },
        {
          path: "/hub",
          element: <AppShell />,
          errorElement: <RouteErrorPage />,
          children: [
            { index: true, element: <DashboardPage /> },
            { path: "dashboard", element: <DashboardPage /> },
            { path: "tasks", element: <TaskViewPage title="Inbox" preset="inbox" /> },
            { path: "today", element: <TodayPage /> },
            { path: "calendar", element: <CalendarPage /> },
            { path: "projects", element: <ProjectsPage /> },
            { path: "notes", element: <NotesPage /> },
            { path: "reminders", element: <RemindersPage /> },
            { path: "focus", element: <FocusPage /> },
            { path: "tasks/upcoming", element: <TaskViewPage title="Upcoming" preset="upcoming" /> },
            { path: "tasks/overdue", element: <TaskViewPage title="Overdue" preset="overdue" /> },
            {
              path: "tasks/completed",
              element: <TaskViewPage title="Completed" preset="completed" />,
            },
            { path: "*", element: <DashboardPage /> },
          ],
        },
        { path: "*", element: <HomePage /> },
      ]),
    [],
  );

  return (
    <div
      className="-m-6 min-h-[calc(100dvh-4.25rem)] p-6"
      style={{
        background:
          "radial-gradient(circle at 5% 15%, rgb(186 230 253 / 0.4), transparent 35%), radial-gradient(circle at 95% 5%, rgb(253 186 116 / 0.35), transparent 30%), linear-gradient(160deg, #f8fafc 0%, #f1f5f9 35%, #eff6ff 100%)",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}
