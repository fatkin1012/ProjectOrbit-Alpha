import type { ToolboxPlugin } from "../plugin-types";
import { ImportedRepoViewer, RepoImporterRoot } from "./RepoImporterRoot";

const repoImporterPlugin: ToolboxPlugin = {
  id: "repo-importer",
  name: "Repo Import Wizard",
  version: "0.1.0",
  routes: [
    {
      path: "/import",
      element: <RepoImporterRoot />,
    },
    {
      path: "/imported/:repoId/*",
      element: <ImportedRepoViewer />,
    },
  ],
  menu: [
    {
      label: "Repo Import",
      to: "/import",
      icon: "Import",
    },
  ],
};

export default repoImporterPlugin;
