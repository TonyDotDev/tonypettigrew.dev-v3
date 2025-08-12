"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";

const panels = [
  { id: "explorer", label: "Explorer", content: "Explorer panel content" },
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

export default function RootAppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);

  const handleTabChange = (index: number) => {
    if (index === activeTab) {
      setPanelOpen((isOpen) => !isOpen);
    } else {
      setActiveTab(index);
      setPanelOpen(true);
    }
  };

  return (
    <div className="flex">
      <Sidebar active={activeTab} onTabChange={handleTabChange} />
      <div className="flex flex-1">
        {/* Side Panel */}
        {panelOpen && (
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
                  <div className="text-foreground-primary flex h-10 items-center px-3">
                    <h2 className="text-panel-content-header text-xs">
                      {panel.label.toUpperCase()}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </aside>
        )}
        {/* Main Content */}
        <main className="bg-background text-foreground-primary flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
