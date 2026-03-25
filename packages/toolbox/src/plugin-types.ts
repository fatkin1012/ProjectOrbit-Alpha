import type { ReactNode } from "react";

export type RouteRecord = {
  path: string;
  element: ReactNode;
};

export type MenuRecord = {
  label: string;
  to: string;
  icon?: string;
  category?: string;
};

export interface ToolboxPlugin {
  id: string;
  name?: string;
  version?: string;
  routes: RouteRecord[];
  menu: MenuRecord[];
}
