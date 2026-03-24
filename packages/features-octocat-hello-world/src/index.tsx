import type { ToolboxPlugin } from "@toolbox/plugin-types";
import GeneratedFeatureRoot from "./GeneratedFeatureRoot";

const featureOctocatHelloWorldPlugin: ToolboxPlugin = {
  id: "imported-octocat-hello-world",
  name: "Hello World",
  version: "0.1.0",
  routes: [
    {
      path: "/repo-octocat-hello-world/*",
      element: <GeneratedFeatureRoot />,
    },
  ],
  menu: [
    {
      label: "Hello World",
      to: "/repo-octocat-hello-world",
      icon: "Repo",
    },
  ],
};

export default featureOctocatHelloWorldPlugin;
