import type { ToolboxPlugin } from "@toolbox/plugin-types";
import GeneratedFeatureRoot from "./GeneratedFeatureRoot";

const featureFatkin1012SapLocalWikiPlugin: ToolboxPlugin = {
  id: "imported-fatkin1012-sap-local-wiki",
  name: "Sap Local Wiki",
  version: "0.1.0",
  routes: [
    {
      path: "/repo-fatkin1012-sap-local-wiki/*",
      element: <GeneratedFeatureRoot />,
    },
  ],
  menu: [
    {
      label: "Sap Local Wiki",
      to: "/repo-fatkin1012-sap-local-wiki",
      icon: "Repo",
    },
  ],
};

export default featureFatkin1012SapLocalWikiPlugin;
