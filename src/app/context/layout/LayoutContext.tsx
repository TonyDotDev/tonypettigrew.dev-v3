import { createContext, useState } from "react";
import { routes } from "@/app/RootAppShell/routes";

export type OpenEditor = (typeof routes)[number];

interface LayoutContext {
  isSidebarOpen: boolean;
  toggleSidebar: (open?: boolean) => void;
  openEditors: OpenEditor[];
  handleOpenEditor: (editor: OpenEditor) => void;
  handleCloseEditor: (editor: OpenEditor) => void;
}

const defaultOpenEditors: OpenEditor[] = [...routes];

export const LayoutContext = createContext<LayoutContext>({
  isSidebarOpen: false,
  toggleSidebar: () => {},
  openEditors: defaultOpenEditors,
  handleOpenEditor: () => {},
  handleCloseEditor: () => {},
});

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openEditors, setOpenEditors] =
    useState<OpenEditor[]>(defaultOpenEditors);

  const toggleSidebar = (open?: boolean) => {
    setIsSidebarOpen((prev) => {
      return open ?? !prev;
    });
  };

  const handleOpenEditor = (editor: OpenEditor) => {
    setOpenEditors((prev) => {
      return [...prev, editor];
    });
  };

  const handleCloseEditor = (editor: OpenEditor) => {
    setOpenEditors((prev) => {
      return prev.filter((e) => e !== editor);
    });
  };

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        openEditors,
        handleOpenEditor,
        handleCloseEditor,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
