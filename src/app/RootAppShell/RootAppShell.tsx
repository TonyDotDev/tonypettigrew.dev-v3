"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

import { useLayoutContext } from "@/app/context";
import Sidebar from "./Sidebar";
import { ExplorerContent } from "./PanelContent";
import { NavigationTab } from "./Navigation";
import { navigateToAdjacentEditor } from "./navigateToAdjacentEditor";

const panels = [
  {
    id: "explorer",
    label: "Explorer",
    component: ExplorerContent,
  },
  { id: "search", label: "Search", content: "Search panel content" },
  {
    id: "source-control",
    label: "My Featured Repos",
    content: "Source Control panel content",
  },
  {
    id: "chat",
    label: "Ask About My Experience",
    content: "Chat panel content",
  },
  { id: "spotify", label: "My Playlists", content: "My Playlists" },
];

export const RootAppShell = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const { isSidebarOpen, toggleSidebar, openEditors, handleCloseEditor } =
    useLayoutContext();

  useHotkeys("shift+alt+e", () => {
    handleTabChange(0);
  });

  useHotkeys("shift+alt+f", () => {
    handleTabChange(1);
  });

  useHotkeys("shift+alt+g", () => {
    handleTabChange(2);
  });

  useHotkeys("shift+alt+c", () => {
    handleTabChange(3);
  });

  useHotkeys("shift+alt+s", () => {
    handleTabChange(4);
  });

  const handleTabChange = (index: number) => {
    if (index === activeTab) {
      toggleSidebar();
    } else {
      setActiveTab(index);
      toggleSidebar(true);
    }
  };

  const hasOpenEditors = openEditors.length > 0;

  // Don't render layout when in sanity studio
  if (pathname.includes("/studio")) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <Sidebar active={activeTab} onTabChange={handleTabChange} />
      <div className="flex flex-1">
        {/* Side Panel */}
        {isSidebarOpen && (
          <aside className="bg-panel-content-bg w-80">
            {panels.map((panel, index) => (
              <div
                key={panel.id}
                role="tabpanel"
                id={`panel-${panel.id}`}
                aria-labelledby={`sidebar-${panel.label.split(" ").join("-")}`}
                className={activeTab === index ? "block" : "hidden"}
              >
                <div>
                  <div className="flex h-10 items-center px-6">
                    <h2 className="text-panel-content-header text-xs">
                      {panel.label.toUpperCase()}
                    </h2>
                  </div>
                  <div>{panel.component && <panel.component />}</div>
                </div>
              </div>
            ))}
          </aside>
        )}
        {/* Main Content */}
        <div className="flex h-screen flex-1 flex-col">
          <nav
            className={`h-9 ${
              hasOpenEditors ? "bg-navigation-bg" : "bg-background"
            }`}
          >
            <ul className="flex h-full items-center gap-0.5 overflow-x-auto">
              {openEditors.map((editor) => {
                const isActive = pathname === editor.href;
                const handleClose = () => {
                  handleCloseEditor(editor);

                  if (isActive) {
                    navigateToAdjacentEditor(openEditors, editor, router);
                  }
                };
                return (
                  <li className="h-full flex-shrink-0" key={editor.href}>
                    <NavigationTab
                      label={editor.label}
                      href={editor.href}
                      isActive={isActive}
                      handleClose={handleClose}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
          <main className="bg-background text-foreground-primary smooth-scroll min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-2xl px-4 py-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};
