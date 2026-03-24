import type { ToolboxPlugin } from "@toolbox/plugin-types";
import GeneratedFeatureRoot from "./GeneratedFeatureRoot";

const featureOctocatSpoonKnifePlugin: ToolboxPlugin = {
  id: "imported-octocat-spoon-knife",
  name: "Spoon Knife",
  version: "0.1.0",
  routes: [
    {
      path: "/repo-octocat-spoon-knife/*",
      element: <GeneratedFeatureRoot />,
    },
  ],
  menu: [
    {
      label: "Spoon Knife",
      to: "/repo-octocat-spoon-knife",
      icon: "Repo",
    },
  ],
};

export default featureOctocatSpoonKnifePlugin;
