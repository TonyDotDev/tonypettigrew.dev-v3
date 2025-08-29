import { useHotkeys } from "react-hotkeys-hook";

import { useSidebarState } from "@/app/stores";

export const useInitializeHotkeys = () => {
  const { activeSidebarTab, toggleSidebar } = useSidebarState();

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
    if (index === activeSidebarTab) {
      toggleSidebar();
    } else {
      toggleSidebar(true);
    }
  };
};
