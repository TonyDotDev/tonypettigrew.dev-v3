import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { capitalize } from "lodash";

import { type Route } from "@/app/routes";
import { routes } from "@/app/routes";
import { announceToScreenReader } from "@/app/utils";
import {
  EXPLORER_ACCORDIONS,
  type ExplorerAccordionValue,
} from "@/app/constants";

const HIGHLIGHT_DURATION = 2000;
const defaultOpenEditors: Route[] = Object.values(routes);

interface LayoutState {
  // State
  explorerAccordions: {
    [EXPLORER_ACCORDIONS.OPEN_EDITORS]: boolean;
    [EXPLORER_ACCORDIONS.WWW_TONYPETTIGREW_DEV]: boolean;
    [EXPLORER_ACCORDIONS.OUTLINE]: boolean;
    [EXPLORER_ACCORDIONS.TIMELINE]: boolean;
  };
  isSidebarOpen: boolean;
  activeSidebarTab: number;
  openEditors: Route[];
  isNavigationHighlighted: boolean;
  highlightedExplorerAccordion: ExplorerAccordionValue | null;

  // Actions
  toggleSidebar: (open?: boolean) => void;
  setActiveSidebarTab: (index: number) => void;
  openFileExplorer: (focusExplorerContent?: () => void) => void;
  handleOpenEditor: (editor: Route) => void;
  handleCloseEditor: (editor: Route) => void;
  flashNavigationTabs: (focusNavigation?: () => void) => void;
  addEditorFromPathname: (pathname: string) => void;
  toggleExplorerAccordion: (
    accordion: ExplorerAccordionValue,
    open?: boolean,
  ) => void;
  flashExplorerAccordion: (accordion: ExplorerAccordionValue) => void;
}

export const useLayoutStore = create<LayoutState>()(
  devtools(
    (set, get) => ({
      // Initial state
      isSidebarOpen: false,
      activeSidebarTab: 0,
      openEditors: defaultOpenEditors,
      isNavigationHighlighted: false,
      highlightedExplorerAccordion: null,
      explorerAccordions: {
        [EXPLORER_ACCORDIONS.OPEN_EDITORS]: false,
        [EXPLORER_ACCORDIONS.WWW_TONYPETTIGREW_DEV]: false,
        [EXPLORER_ACCORDIONS.OUTLINE]: false,
        [EXPLORER_ACCORDIONS.TIMELINE]: false,
      },

      // Actions
      toggleSidebar: (open?: boolean) =>
        set(
          (state) => ({
            isSidebarOpen: open ?? !state.isSidebarOpen,
          }),
          false,
          "layout/toggleSidebar",
        ),

      setActiveSidebarTab: (index: number) =>
        set({ activeSidebarTab: index }, false, "layout/setActiveSidebarTab"),

      openFileExplorer: (focusExplorerContent?: () => void) => {
        const {
          isSidebarOpen,
          toggleSidebar,
          setActiveSidebarTab,
          flashExplorerAccordion,
        } = get();
        if (!isSidebarOpen) {
          toggleSidebar(true);
        }
        setActiveSidebarTab(0); // Explorer is at index 0
        flashExplorerAccordion(EXPLORER_ACCORDIONS.OPEN_EDITORS);

        // Focus explorer content if function provided
        if (focusExplorerContent) {
          setTimeout(() => {
            focusExplorerContent();
          }, 100);
        }

        // Announce to screen readers
        announceToScreenReader(
          "File explorer opened. Focus moved to open editors section. Use Tab to navigate through the file list.",
        );
      },

      handleOpenEditor: (editor: Route) =>
        set(
          (state) => ({
            openEditors: [...state.openEditors, editor],
          }),
          false,
          "layout/handleOpenEditor",
        ),

      handleCloseEditor: (editor: Route) =>
        set(
          (state) => ({
            openEditors: state.openEditors.filter((e) => e !== editor),
          }),
          false,
          "layout/handleCloseEditor",
        ),

      flashNavigationTabs: (focusNavigation?: () => void) => {
        set(
          { isNavigationHighlighted: true },
          false,
          "layout/flashNavigationTabs",
        );

        // Focus navigation area if function provided
        if (focusNavigation) {
          setTimeout(() => {
            focusNavigation();
          }, 100);
        }

        const announcement =
          "Navigation tabs are highlighted. Focus moved to file tabs. Use arrow keys to switch between open files.";

        announceToScreenReader(announcement);

        setTimeout(() => {
          set(
            { isNavigationHighlighted: false },
            false,
            "layout/flashNavigationTabs/end",
          );
        }, HIGHLIGHT_DURATION);
      },

      addEditorFromPathname: (pathname: string) => {
        const { openEditors, handleOpenEditor } = get();
        const hasOpenEditor = openEditors.find(
          (editor) => editor.href === pathname,
        );

        if (!hasOpenEditor) {
          const isMd = pathname.includes("/blog/");
          const labelName = isMd
            ? pathname.replace("/blog/", "")
            : pathname.replace("/", "");

          if (labelName === "") return;

          const label: Route["label"] = isMd
            ? `${labelName}.md`
            : `${labelName}.tsx`;

          handleOpenEditor({
            label: capitalize(label),
            href: pathname as Route["href"],
          });
        }
      },
      toggleExplorerAccordion: (
        accordion: keyof LayoutState["explorerAccordions"],
        open?: boolean,
      ) =>
        set(
          (state) => ({
            explorerAccordions: {
              ...state.explorerAccordions,
              [accordion]: open ?? !state.explorerAccordions[accordion],
            },
          }),
          false,
          "layout/toggleExplorerAccordion",
        ),
      flashExplorerAccordion: (
        accordion: keyof LayoutState["explorerAccordions"],
      ) => {
        set(
          () => ({ highlightedExplorerAccordion: accordion }),
          false,
          "layout/flashExplorerAccordion",
        );

        // Announce to screen readers
        const announcement = `File explorer opened. ${accordion.replace(/([A-Z])/g, " $1").toLowerCase()} section is highlighted.`;
        announceToScreenReader(announcement);

        setTimeout(() => {
          set(
            () => ({ highlightedExplorerAccordion: null }),
            false,
            "layout/flashExplorerAccordion/end",
          );
        }, HIGHLIGHT_DURATION);
      },
    }),
    {
      name: "layout-store",
    },
  ),
);

export const useSidebarState = () => {
  const isSidebarOpen = useLayoutStore((state) => state.isSidebarOpen);
  const activeSidebarTab = useLayoutStore((state) => state.activeSidebarTab);
  const setActiveSidebarTab = useLayoutStore(
    (state) => state.setActiveSidebarTab,
  );
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);

  return {
    isSidebarOpen,
    activeSidebarTab,
    setActiveSidebarTab,
    toggleSidebar,
  };
};

export const useNavigationState = () => {
  const openEditors = useLayoutStore((state) => state.openEditors);
  const isNavigationHighlighted = useLayoutStore(
    (state) => state.isNavigationHighlighted,
  );
  const handleOpenEditor = useLayoutStore((state) => state.handleOpenEditor);
  const handleCloseEditor = useLayoutStore((state) => state.handleCloseEditor);
  const flashNavigationTabs = useLayoutStore(
    (state) => state.flashNavigationTabs,
  );

  return {
    openEditors,
    isNavigationHighlighted,
    handleOpenEditor,
    handleCloseEditor,
    flashNavigationTabs,
  };
};

export const useExplorerState = () => {
  const explorerAccordions = useLayoutStore(
    (state) => state.explorerAccordions,
  );
  const toggleExplorerAccordion = useLayoutStore(
    (state) => state.toggleExplorerAccordion,
  );
  const highlightedExplorerAccordion = useLayoutStore(
    (state) => state.highlightedExplorerAccordion,
  );
  return {
    explorerAccordions,
    toggleExplorerAccordion,
    highlightedExplorerAccordion,
  };
};
