"use client";

import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import { getPlugins, initializePlugins } from "../../../plugin-registry";
import type { ToolboxPlugin } from "../../../plugin-types";
import styles from "../../(toolbox)/app-router/app-router.module.css";

type AppRouterProps = {
  basename?: string;
};

type BaseFeatureItem = {
  key: string;
  label: string;
  to: string;
  pluginName: string;
  defaultCategory: string;
};

type FeatureItem = {
  key: string;
  label: string;
  to: string;
  pluginName: string;
  category: string;
};

type HomeLayoutConfig = {
  version: 2;
  sectionOrder: string[];
  itemOrderBySection: Record<string, string[]>;
  categoryByItemKey: Record<string, string>;
};

type DragState =
  | { type: "section"; section: string }
  | { type: "item"; fromSection: string; itemKey: string }
  | null;

const HOME_LAYOUT_KEY = "toolbox-home-layout-v2";

function normalizeCategory(category: string | undefined): string {
  const fallback = "General";
  if (!category) {
    return fallback;
  }

  const trimmed = category.trim();
  if (!trimmed) {
    return fallback;
  }

  return trimmed.slice(0, 40);
}

function normalizeCategoryInput(category: string | undefined): string {
  if (!category) {
    return "";
  }

  return category.trim().slice(0, 40);
}

function defaultLayout(): HomeLayoutConfig {
  return {
    version: 2,
    sectionOrder: [],
    itemOrderBySection: {},
    categoryByItemKey: {},
  };
}

function groupedFromItems(items: FeatureItem[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};
  items.forEach((item) => {
    grouped[item.category] ??= [];
    grouped[item.category].push(item.key);
  });
  return grouped;
}

function buildFeatureItems(baseItems: BaseFeatureItem[], layout: HomeLayoutConfig): FeatureItem[] {
  return baseItems.map((item) => ({
    ...item,
    category: normalizeCategory(layout.categoryByItemKey[item.key] ?? item.defaultCategory),
  }));
}

function reconcileLayout(layout: HomeLayoutConfig, baseItems: BaseFeatureItem[]): HomeLayoutConfig {
  const normalizedLayout: HomeLayoutConfig = {
    version: 2,
    sectionOrder: Array.isArray(layout.sectionOrder) ? [...layout.sectionOrder] : [],
    itemOrderBySection: layout.itemOrderBySection ?? {},
    categoryByItemKey: layout.categoryByItemKey ?? {},
  };

  const normalizedOverrides: Record<string, string> = {};
  const knownKeys = new Set(baseItems.map((item) => item.key));
  Object.entries(normalizedLayout.categoryByItemKey).forEach(([key, value]) => {
    if (knownKeys.has(key)) {
      normalizedOverrides[key] = normalizeCategory(value);
    }
  });

  const items = buildFeatureItems(baseItems, {
    ...normalizedLayout,
    categoryByItemKey: normalizedOverrides,
  });

  const grouped = groupedFromItems(items);
  const availableSections = Array.from(
    new Set([...Object.keys(grouped), ...normalizedLayout.sectionOrder]),
  );
  const preserved = normalizedLayout.sectionOrder.filter((section) => availableSections.includes(section));
  const added = availableSections.filter((section) => !preserved.includes(section));

  const itemOrderBySection: Record<string, string[]> = {};
  [...preserved, ...added].forEach((section) => {
    const expected = grouped[section] ?? [];
    const expectedSet = new Set(expected);
    const previous = normalizedLayout.itemOrderBySection[section] ?? [];
    const next = previous.filter((key) => expectedSet.has(key));
    expected.forEach((key) => {
      if (!next.includes(key)) {
        next.push(key);
      }
    });
    itemOrderBySection[section] = next;
  });

  return {
    version: 2,
    sectionOrder: [...preserved, ...added],
    itemOrderBySection,
    categoryByItemKey: normalizedOverrides,
  };
}

function moveInArray<T>(items: T[], from: number, to: number): T[] {
  if (from < 0 || to < 0 || from >= items.length || to >= items.length || from === to) {
    return items;
  }

  const cloned = [...items];
  const [picked] = cloned.splice(from, 1);
  cloned.splice(to, 0, picked);
  return cloned;
}

function parseStoredLayout(raw: string | null): HomeLayoutConfig | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<HomeLayoutConfig> & {
      version?: number;
      sectionOrder?: string[];
      itemOrderBySection?: Record<string, string[]>;
      categoryByItemKey?: Record<string, string>;
    };

    if (parsed.version === 2) {
      return {
        version: 2,
        sectionOrder: Array.isArray(parsed.sectionOrder) ? parsed.sectionOrder : [],
        itemOrderBySection: parsed.itemOrderBySection ?? {},
        categoryByItemKey: parsed.categoryByItemKey ?? {},
      };
    }

    if (parsed.version === 1) {
      return {
        version: 2,
        sectionOrder: Array.isArray(parsed.sectionOrder) ? parsed.sectionOrder : [],
        itemOrderBySection: parsed.itemOrderBySection ?? {},
        categoryByItemKey: {},
      };
    }

    return null;
  } catch {
    return null;
  }
}

function AppRouterContent() {
  const navigate = useNavigate();
  const [plugins, setPlugins] = useState<ToolboxPlugin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [customizeMode, setCustomizeMode] = useState(false);
  const [layoutConfig, setLayoutConfig] = useState<HomeLayoutConfig>(defaultLayout());
  const [dragState, setDragState] = useState<DragState>(null);
  const [newCategory, setNewCategory] = useState("");
  const [renameDrafts, setRenameDrafts] = useState<Record<string, string>>({});
  const [layoutHydrated, setLayoutHydrated] = useState(false);

  const baseFeatureItems = useMemo<BaseFeatureItem[]>(
    () =>
      plugins.flatMap((plugin) =>
        plugin.menu.map((item) => ({
          key: `${plugin.id}::${item.to}`,
          label: item.label,
          to: item.to,
          pluginName: plugin.name || plugin.id,
          defaultCategory: normalizeCategory(item.category),
        })),
      ),
    [plugins],
  );

  const featureItems = useMemo(
    () => buildFeatureItems(baseFeatureItems, layoutConfig),
    [baseFeatureItems, layoutConfig],
  );

  const groupedItems = useMemo(() => {
    const bySection = new Map<string, FeatureItem[]>();
    featureItems.forEach((item) => {
      const list = bySection.get(item.category) ?? [];
      list.push(item);
      bySection.set(item.category, list);
    });
    return bySection;
  }, [featureItems]);

  const setReconciledLayout = (updater: (current: HomeLayoutConfig) => HomeLayoutConfig) => {
    setLayoutConfig((current) => reconcileLayout(updater(current), baseFeatureItems));
  };

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
      } catch (loadError) {
        setError(`Failed to load plugins: ${loadError}`);
      } finally {
        setLoading(false);
      }
    }

    loadPlugins();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const parsed = parseStoredLayout(window.localStorage.getItem(HOME_LAYOUT_KEY));
    if (parsed) {
      setLayoutConfig(parsed);
    }

    setLayoutHydrated(true);
  }, []);

  useEffect(() => {
    if (!layoutHydrated || baseFeatureItems.length === 0) {
      return;
    }

    setLayoutConfig((current) => reconcileLayout(current, baseFeatureItems));
  }, [baseFeatureItems, layoutHydrated]);

  useEffect(() => {
    if (typeof window === "undefined" || !layoutHydrated) {
      return;
    }

    window.localStorage.setItem(HOME_LAYOUT_KEY, JSON.stringify(layoutConfig));
  }, [layoutConfig, layoutHydrated]);

  useEffect(() => {
    setRenameDrafts((current) => {
      const nextDrafts: Record<string, string> = {};
      layoutConfig.sectionOrder.forEach((section) => {
        nextDrafts[section] = current[section] ?? section;
      });
      return nextDrafts;
    });
  }, [layoutConfig.sectionOrder]);

  const orderedSections = useMemo(() => {
    const listed = [...layoutConfig.sectionOrder];
    const missing = Array.from(groupedItems.keys()).filter((section) => !listed.includes(section));
    return [...listed, ...missing];
  }, [groupedItems, layoutConfig.sectionOrder]);

  const resetLayout = () => {
    setLayoutConfig(reconcileLayout(defaultLayout(), baseFeatureItems));
  };

  const moveSection = (section: string, direction: -1 | 1) => {
    setReconciledLayout((current) => {
      const index = current.sectionOrder.indexOf(section);
      if (index === -1) {
        return current;
      }

      return {
        ...current,
        sectionOrder: moveInArray(current.sectionOrder, index, index + direction),
      };
    });
  };

  const moveItem = (section: string, itemKey: string, direction: -1 | 1) => {
    setReconciledLayout((current) => {
      const currentSectionItems = current.itemOrderBySection[section] ?? [];
      const index = currentSectionItems.indexOf(itemKey);
      if (index === -1) {
        return current;
      }

      return {
        ...current,
        itemOrderBySection: {
          ...current.itemOrderBySection,
          [section]: moveInArray(currentSectionItems, index, index + direction),
        },
      };
    });
  };

  const moveItemToSection = (itemKey: string, fromSection: string, toSection: string, beforeItemKey?: string) => {
    setReconciledLayout((current) => {
      const nextMap: Record<string, string[]> = { ...current.itemOrderBySection };
      const source = [...(nextMap[fromSection] ?? [])].filter((key) => key !== itemKey);
      const target = [...(nextMap[toSection] ?? [])].filter((key) => key !== itemKey);

      const insertAt = beforeItemKey ? target.indexOf(beforeItemKey) : -1;
      if (insertAt >= 0) {
        target.splice(insertAt, 0, itemKey);
      } else {
        target.push(itemKey);
      }

      nextMap[fromSection] = source;
      nextMap[toSection] = target;

      return {
        ...current,
        itemOrderBySection: nextMap,
        categoryByItemKey: {
          ...current.categoryByItemKey,
          [itemKey]: toSection,
        },
      };
    });
  };

  const handleSectionDrop = (targetSection: string) => {
    if (!dragState) {
      return;
    }

    if (dragState.type === "section") {
      const from = orderedSections.indexOf(dragState.section);
      const to = orderedSections.indexOf(targetSection);
      if (from >= 0 && to >= 0 && from !== to) {
        setReconciledLayout((current) => ({
          ...current,
          sectionOrder: moveInArray(current.sectionOrder, from, to),
        }));
      }
    }

    if (dragState.type === "item") {
      moveItemToSection(dragState.itemKey, dragState.fromSection, targetSection);
    }

    setDragState(null);
  };

  const handleItemDrop = (targetSection: string, targetItemKey: string) => {
    if (!dragState || dragState.type !== "item") {
      return;
    }

    moveItemToSection(dragState.itemKey, dragState.fromSection, targetSection, targetItemKey);
    setDragState(null);
  };

  const addCategory = () => {
    const name = normalizeCategoryInput(newCategory);
    if (!name || layoutConfig.sectionOrder.includes(name)) {
      return;
    }

    setReconciledLayout((current) => ({
      ...current,
      sectionOrder: [...current.sectionOrder, name],
      itemOrderBySection: {
        ...current.itemOrderBySection,
        [name]: current.itemOrderBySection[name] ?? [],
      },
    }));
    setNewCategory("");
  };

  const renameCategory = (previousName: string) => {
    const nextName = normalizeCategoryInput(renameDrafts[previousName]);
    if (!nextName || nextName === previousName) {
      return;
    }

    setReconciledLayout((current) => {
      const nextOrder = current.sectionOrder.map((section) => (section === previousName ? nextName : section));
      const nextItems = { ...current.itemOrderBySection };
      const carried = nextItems[previousName] ?? [];
      delete nextItems[previousName];
      const existingTarget = nextItems[nextName] ?? [];
      nextItems[nextName] = [...existingTarget, ...carried.filter((key) => !existingTarget.includes(key))];

      const nextCategoryByKey = { ...current.categoryByItemKey };
      carried.forEach((key) => {
        nextCategoryByKey[key] = nextName;
      });

      return {
        ...current,
        sectionOrder: nextOrder,
        itemOrderBySection: nextItems,
        categoryByItemKey: nextCategoryByKey,
      };
    });
  };

  const deleteCategory = (category: string) => {
    const fallback = "General";

    setReconciledLayout((current) => {
      const nextOrder = current.sectionOrder.filter((section) => section !== category);
      if (!nextOrder.includes(fallback)) {
        nextOrder.push(fallback);
      }

      const nextItems = { ...current.itemOrderBySection };
      const removedItems = nextItems[category] ?? [];
      delete nextItems[category];
      const fallbackItems = nextItems[fallback] ?? [];
      nextItems[fallback] = [...fallbackItems, ...removedItems.filter((key) => !fallbackItems.includes(key))];

      const nextCategoryByKey = { ...current.categoryByItemKey };
      removedItems.forEach((key) => {
        nextCategoryByKey[key] = fallback;
      });

      return {
        ...current,
        sectionOrder: nextOrder,
        itemOrderBySection: nextItems,
        categoryByItemKey: nextCategoryByKey,
      };
    });
  };

  const applyTemplate = (template: "alphabetical" | "management-first" | "single-stream") => {
    if (template === "single-stream") {
      setReconciledLayout((current) => {
        const items = buildFeatureItems(baseFeatureItems, current);
        const grouped = new Map<string, FeatureItem[]>();
        items.forEach((item) => {
          const list = grouped.get(item.category) ?? [];
          list.push(item);
          grouped.set(item.category, list);
        });

        const nextOrder = [...current.sectionOrder];
        const missingSections = Array.from(grouped.keys()).filter((section) => !nextOrder.includes(section));
        const sectionOrder = [...nextOrder, ...missingSections];

        const itemOrderBySection: Record<string, string[]> = {};
        sectionOrder.forEach((section) => {
          const currentSorted = [...(grouped.get(section) ?? [])].sort((a, b) => a.label.localeCompare(b.label));
          itemOrderBySection[section] = currentSorted.map((item) => item.key);
        });

        return {
          ...current,
          sectionOrder,
          itemOrderBySection,
        };
      });
      return;
    }

    setReconciledLayout((current) => {
      const items = buildFeatureItems(baseFeatureItems, current);
      const grouped = new Map<string, FeatureItem[]>();
      items.forEach((item) => {
        const list = grouped.get(item.category) ?? [];
        list.push(item);
        grouped.set(item.category, list);
      });

      let nextOrder = Array.from(grouped.keys());
      if (template === "alphabetical") {
        nextOrder = [...nextOrder].sort((a, b) => a.localeCompare(b));
      }

      if (template === "management-first") {
        const pin = ["Management", "Imported", "General"];
        const head = pin.filter((section) => nextOrder.includes(section));
        const tail = nextOrder.filter((section) => !head.includes(section)).sort((a, b) => a.localeCompare(b));
        nextOrder = [...head, ...tail];
      }

      const itemOrderBySection: Record<string, string[]> = {};
      nextOrder.forEach((section) => {
        const ordered = [...(grouped.get(section) ?? [])].sort((a, b) => a.label.localeCompare(b.label));
        itemOrderBySection[section] = ordered.map((item) => item.key);
      });

      return {
        ...current,
        sectionOrder: nextOrder,
        itemOrderBySection,
      };
    });
  };

  const exportLayout = () => {
    const payload = JSON.stringify(layoutConfig, null, 2);
    window.prompt("Copy layout JSON", payload);
  };

  const importLayout = () => {
    const raw = window.prompt("Paste layout JSON");
    if (!raw) {
      return;
    }

    const parsed = parseStoredLayout(raw);
    if (!parsed) {
      window.alert("Invalid layout JSON.");
      return;
    }

    setLayoutConfig(reconcileLayout(parsed, baseFeatureItems));
  };

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
          <h1>ProjectOrbit</h1>
          <nav className={styles.topNav} aria-label="Tool navigation">
            {featureItems.map((item) => (
              <Link key={item.key} to={item.to} className={styles.topNavItem}>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className={styles.customizeButton}
            onClick={() => setCustomizeMode((current) => !current)}
          >
            {customizeMode ? "Done" : "Customize Home"}
          </button>
          <button type="button" className={styles.customizeSecondaryButton} onClick={resetLayout}>
            Reset Layout
          </button>
          <button type="button" className={styles.homeButton} onClick={() => window.location.assign("/")}>
            Home
          </button>
        </div>

        {customizeMode ? (
          <section className={styles.controlPanel}>
            <div className={styles.templateGroup}>
              <span>Templates</span>
              <button type="button" className={styles.orderButton} onClick={() => applyTemplate("alphabetical")}>
                Alphabetical
              </button>
              <button type="button" className={styles.orderButton} onClick={() => applyTemplate("management-first")}>
                Management First
              </button>
              <button type="button" className={styles.orderButton} onClick={() => applyTemplate("single-stream")}>
                Single Stream
              </button>
            </div>

            <div className={styles.templateGroup}>
              <span>Layout JSON</span>
              <button type="button" className={styles.orderButton} onClick={exportLayout}>
                Export
              </button>
              <button type="button" className={styles.orderButton} onClick={importLayout}>
                Import
              </button>
            </div>

            <div className={styles.categoryGroup}>
              <span>Category Manager</span>
              <div className={styles.inlineControls}>
                <input
                  value={newCategory}
                  onChange={(event) => setNewCategory(event.target.value)}
                  placeholder="New category"
                  className={styles.categoryInput}
                />
                <button type="button" className={styles.orderButton} onClick={addCategory}>
                  Add
                </button>
              </div>
              <div className={styles.categoryList}>
                {orderedSections.map((section) => (
                  <div key={section} className={styles.categoryRow}>
                    <input
                      value={renameDrafts[section] ?? section}
                      onChange={(event) =>
                        setRenameDrafts((current) => ({
                          ...current,
                          [section]: event.target.value,
                        }))
                      }
                      className={styles.categoryInput}
                    />
                    <button type="button" className={styles.orderButton} onClick={() => renameCategory(section)}>
                      Rename
                    </button>
                    <button type="button" className={styles.orderButton} onClick={() => deleteCategory(section)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <div className={styles.content}>
          <Routes>
            <Route
              path="/"
              element={
                <div className={styles.dashboard}>
                  <div className={styles.dashboardHeader}>
                    <h2>ProjectOrbit</h2>
                    <p>
                      {customizeMode
                        ? "Drag sections or cards to reorder. You can also move cards across categories."
                        : "Select a feature to get started."}
                    </p>
                  </div>

                  <div className={styles.sectionStack}>
                    {orderedSections.map((section, sectionIndex) => {
                      const sectionItems = groupedItems.get(section) ?? [];
                      const orderedKeys = layoutConfig.itemOrderBySection[section] ?? sectionItems.map((item) => item.key);
                      const itemMap = new Map(sectionItems.map((item) => [item.key, item]));
                      const orderedItems = orderedKeys
                        .map((key) => itemMap.get(key))
                        .filter((item): item is FeatureItem => Boolean(item));

                      return (
                        <section
                          key={section}
                          className={`${styles.sectionCard} ${dragState?.type === "section" ? styles.sectionDropActive : ""}`}
                          onDragOver={(event) => event.preventDefault()}
                          onDrop={() => handleSectionDrop(section)}
                        >
                          <div className={styles.sectionHeaderRow}>
                            <h3>{section}</h3>
                            {customizeMode ? (
                              <div className={styles.inlineControls}>
                                <button
                                  type="button"
                                  draggable
                                  onDragStart={(event) => {
                                    event.stopPropagation();
                                    setDragState({ type: "section", section });
                                  }}
                                  className={styles.dragHandleButton}
                                  aria-label={`Drag ${section} section`}
                                >
                                  Drag Section
                                </button>
                                <button
                                  type="button"
                                  disabled={sectionIndex === 0}
                                  onClick={() => moveSection(section, -1)}
                                  className={styles.orderButton}
                                >
                                  Section Up
                                </button>
                                <button
                                  type="button"
                                  disabled={sectionIndex === orderedSections.length - 1}
                                  onClick={() => moveSection(section, 1)}
                                  className={styles.orderButton}
                                >
                                  Section Down
                                </button>
                              </div>
                            ) : null}
                          </div>

                          <div className={styles.featureGrid}>
                            {orderedItems.map((item, itemIndex) => (
                              <div
                                key={item.key}
                                className={`${styles.featureCard} ${dragState?.type === "item" ? styles.itemDropActive : ""}`}
                                draggable={customizeMode}
                                onDragStart={(event) => {
                                  event.stopPropagation();
                                  setDragState({ type: "item", fromSection: section, itemKey: item.key });
                                }}
                                onDragOver={(event) => event.preventDefault()}
                                onDrop={() => handleItemDrop(section, item.key)}
                              >
                                <button type="button" onClick={() => navigate(item.to)} className={styles.featureButton}>
                                  <h3>{item.label}</h3>
                                  <p>{item.pluginName}</p>
                                </button>

                                {customizeMode ? (
                                  <div className={styles.inlineControls}>
                                    <button
                                      type="button"
                                      disabled={itemIndex === 0}
                                      onClick={() => moveItem(section, item.key, -1)}
                                      className={styles.orderButton}
                                    >
                                      Up
                                    </button>
                                    <button
                                      type="button"
                                      disabled={itemIndex === orderedItems.length - 1}
                                      onClick={() => moveItem(section, item.key, 1)}
                                      className={styles.orderButton}
                                    >
                                      Down
                                    </button>
                                  </div>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </section>
                      );
                    })}
                  </div>

                  {featureItems.length === 0 ? (
                    <div className={styles.emptyState}>
                      <p>No features available at this time.</p>
                    </div>
                  ) : null}
                </div>
              }
            />

            {plugins.map((plugin) =>
              plugin.routes.map((route, index) => (
                <Route key={`${plugin.id}-route-${index}`} path={route.path} element={route.element} />
              )),
            )}

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

export default function AppRouter({ basename = "/app" }: AppRouterProps) {
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
      basename={basename}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppRouterContent />
    </BrowserRouter>
  );
}
