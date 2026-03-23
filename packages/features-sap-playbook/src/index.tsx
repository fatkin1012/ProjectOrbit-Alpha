import type { ToolboxPlugin } from "@toolbox/plugin-types";
import SapRoot from "./SapRoot";

/**
 * SAP Playbook Plugin
 * Exported as ToolboxPlugin interface for dynamic registration
 */
const sapPlaybookPlugin: ToolboxPlugin = {
  id: "sap-playbook",
  name: "SAP Playbook",
  version: "0.1.0",
  routes: [
    {
      path: "/sap/*",
      element: <SapRoot />,
    },
  ],
  menu: [
    {
      label: "SAP Playbook",
      to: "/sap",
      icon: "📖",
    },
  ],
};

export default sapPlaybookPlugin;
