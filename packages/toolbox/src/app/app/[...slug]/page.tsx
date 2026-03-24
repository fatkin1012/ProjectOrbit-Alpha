"use client";

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import type { ToolboxPlugin } from "../../../plugin-types";
import { getPlugins, initializePlugins } from "../../../plugin-registry";
import styles from "../../(toolbox)/app-router/app-router.module.css";

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
      <main className={styles.main}>
        <div className={styles.topbar}>
          <h1>🧰 Toolbox</h1>
          <nav className={styles.topNav} aria-label="Tool navigation">
            {plugins.flatMap((plugin) =>
              plugin.menu.map((item) => (
                <Link key={`${plugin.id}-${item.to}`} to={item.to} className={styles.topNavItem}>
                  {item.icon && <span className={styles.icon}>{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
              ))
            )}
          </nav>
          <button 
            className={styles.homeButton}
            onClick={() => navigate("/")}
            title="Back to home"
          >
            🏠
          </button>
        </div>

        {/* Plugin Routes */}
        <div className={styles.content}>
          <Routes>
            {/* Default route - Features Dashboard */}
            <Route
              path="/"
              element={
                <div className={styles.dashboard}>
                  <div className={styles.dashboardHeader}>
                    <h2>🧰 Toolbox</h2>
                    <p>Select a feature to get started</p>
                  </div>
                  
                  <div className={styles.featureGrid}>
                    {plugins.map((plugin) => (
                      <div key={plugin.id} className={styles.featureCard}>
                        {plugin.menu.map((item) => (
                          <button
                            key={item.to}
                            onClick={() => navigate(item.to)}
                            className={styles.featureButton}
                          >
                            <div className={styles.featureIcon}>
                              {item.icon || "📦"}
                            </div>
                            <h3>{item.label}</h3>
                            <p>{plugin.name || plugin.id}</p>
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>

                  {plugins.length === 0 && (
                    <div className={styles.emptyState}>
                      <p>No features available at this time.</p>
                    </div>
                  )}
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
    </div>
  );
}

export default function AppRouter() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            void registration.unregister();
          });
        });
      }

      if ("caches" in window) {
        void caches.keys().then((keys) => {
          keys.forEach((key) => {
            void caches.delete(key);
          });
        });
      }
    }

    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  return (
    <BrowserRouter
      basename="/app"
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppRouterContent />
    </BrowserRouter>
  );
}
