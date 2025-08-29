import { lazy } from "react";

const ExplorerContent = lazy(() =>
  import("./PanelContent/ExplorerContent").then((module) => ({
    default: module.ExplorerContent,
  })),
);

const SourceControlContent = lazy(() =>
  import("./PanelContent/SourceControlContent").then((module) => ({
    default: module.SourceControlContent,
  })),
);

export const panels = [
  {
    id: "explorer",
    label: "Explorer",
    component: ExplorerContent,
  },
  { id: "search", label: "Search", content: "Search panel content" },
  {
    id: "source-control",
    label: "Source Control",
    component: SourceControlContent,
  },
  {
    id: "chat",
    label: "Ask About My Experience",
    content: "Chat panel content",
  },
  { id: "spotify", label: "My Playlists", content: "My Playlists" },
];
