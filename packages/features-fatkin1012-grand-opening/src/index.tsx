import type { ToolboxPlugin } from "@toolbox/plugin-types";
import GeneratedFeatureRoot from "./GeneratedFeatureRoot";

const featureFatkin1012GrandOpeningPlugin: ToolboxPlugin = {
  id: "imported-fatkin1012-grand-opening",
  name: "Grand Opening",
  version: "0.1.0",
  routes: [
    {
      path: "/repo-fatkin1012-grand-opening/*",
      element: <GeneratedFeatureRoot />,
    },
  ],
  menu: [
    {
      label: "Grand Opening",
      to: "/repo-fatkin1012-grand-opening",
      icon: "Repo",
    },
  ],
};

export default featureFatkin1012GrandOpeningPlugin;
