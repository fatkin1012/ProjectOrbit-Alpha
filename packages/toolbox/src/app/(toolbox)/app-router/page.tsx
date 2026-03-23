"use client";

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import type { ToolboxPlugin } from "@/plugin-types";
import { getPlugins, initializePlugins } from "@/plugin-registry";
import styles from "./app-router.module.css";

/**
 * SPA Router Component
 * 使用 react-router-dom 實現客戶端路由
 * 從 plugin-registry 動態載入所有指定的 plugins
 */

function AppRouterContent() {
  const navigate = useNavigate();
  const [plugins, setPlugins] = useState<ToolboxPlugin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    async function loadPlugins() {
      try {
        setLoading(true);
        await initializePlugins();
        const registeredPlugins = getPlugins();
        setPlugins(registeredPlugins);
        if (registeredPlugins.length === 0) {
          setError("No plugins found.");
        }
      } catch (err) {
        setError(`Failed to load plugins: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    loadPlugins();
  }, []);

  if (loading) {
    return <div style={{ padding: "2rem" }}>Loading plugins...</div>;
  }

  if (error) {
    return <div style={{ color: "red", padding: "2rem" }}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${mobileSidebarOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h2>Toolbox</h2>
          <button
            className={styles.closeSidebar}
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <nav className={styles.menu}>
          <ul>
            {plugins.map((plugin) =>
              plugin.menu.map((item) => (
                <li key={`${plugin.id}-${item.to}`}>
                  <Link
                    to={item.to}
                    onClick={() => {
                      navigate(item.to);
                      setMobileSidebarOpen(false);
                    }}
                    className={styles.menuItem}
                  >
                    {item.icon && <span className={styles.icon}>{item.icon}</span>}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </nav>
        <div className={styles.footer}>
          <small>© 2024 Toolbox</small>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.topbar}>
          <button
            className={styles.hamburger}
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <h1>Toolbox App Router</h1>
        </div>

        {/* Plugin Routes */}
        <div className={styles.content}>
          <Routes>
            {/* Default route */}
            <Route
              path="/"
              element={
                <div className={styles.welcome}>
                  <h2>Welcome to Toolbox</h2>
                  <p>Select an option from the menu to get started.</p>
                </div>
              }
            />

            {/* Dynamic plugin routes */}
            {plugins.map((plugin) =>
              plugin.routes.map((route, index) => (
                <Route key={`${plugin.id}-route-${index}`} path={route.path} element={route.element} />
              ))
            )}

            {/* 404 route */}
            <Route
              path="*"
              element={
                <div className={styles.notFound}>
                  <h2>404 - Page Not Found</h2>
                  <p>
                    <Link to="/">Back to home</Link>
                  </p>
                </div>
              }
            />
          </Routes>
        </div>
      </main>

      {/* Overlay for mobile */}
      {mobileSidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter basename="/app">
      <AppRouterContent />
    </BrowserRouter>
  );
}
