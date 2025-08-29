"use client";

import { Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useSidebarState, useNavigationState } from "@/app/stores";
import { useFocusManagement } from "@/app/hooks";
import Sidebar from "./Sidebar";
import { NavigationTab } from "./Navigation";
import { panels } from "./constants";
import { navigateToAdjacentEditor } from "./navigateToAdjacentEditor";
import { Footer } from "./Footer";
import { useInitializeHotkeys } from "./useInitializeHotkeys";
import { SidebarContentSkeleton } from "./SidebarContentSkeleton";

export const RootAppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isSidebarOpen, activeSidebarTab } = useSidebarState();
  const { openEditors, handleCloseEditor } = useNavigationState();

  // Focus management
  const { navigationRef, explorerContentRef } = useFocusManagement();

  useInitializeHotkeys();

  const hasOpenEditors = openEditors.length > 0;

  // Don't render layout when in sanity studio
  if (pathname.includes("/studio")) {
    return <>{children}</>;
  }
  // TODO: ErrorBoundary, Better Fallbacks for Suspense BELOW

  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className="flex flex-1">
          {/* Side Panel */}
          {isSidebarOpen && (
            <aside className="bg-panel-content-bg pl-sidebar h-screen w-80 overflow-y-auto">
              {panels.map((panel, index) => (
                <div
                  key={panel.id}
                  role="tabpanel"
                  id={`panel-${panel.id}`}
                  aria-labelledby={`sidebar-${panel.label.split(" ").join("-")}`}
                  className={activeSidebarTab === index ? "block" : "hidden"}
                >
                  <div>
                    <div className="flex h-10 items-center px-6">
                      <h2 className="text-panel-content-header text-xs">
                        {panel.label.toUpperCase()}
                      </h2>
                    </div>
                    <div ref={explorerContentRef}>
                      {/* TODO: ErrorBoundary, Better Fallbacks */}
                      <Suspense
                        fallback={
                          <SidebarContentSkeleton label={panel.label} />
                        }
                      >
                        {panel.component && <panel.component />}
                      </Suspense>
                    </div>
                  </div>
                </div>
              ))}
            </aside>
          )}
          {/* Main Content */}
          <div
            className={`flex h-screen flex-1 flex-col ${isSidebarOpen ? "w-full pl-0" : "pl-sidebar w-screen"}`}
          >
            <nav
              ref={navigationRef}
              tabIndex={-1}
              aria-live="polite"
              aria-label="Navigation tabs"
              role="tablist"
              className={`h-9 ${
                hasOpenEditors ? "bg-navigation-bg" : "bg-transparent"
              }`}
            >
              <ul className="flex h-full items-center gap-0.5 overflow-x-auto">
                {openEditors.map((editor, index) => {
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
                        index={index}
                      />
                    </li>
                  );
                })}
              </ul>
            </nav>
            <main className="bg-background text-foreground-primary min-h-0 flex-1 overflow-y-auto pb-12">
              <div className="mx-auto max-w-2xl px-4 py-8">{children}</div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
