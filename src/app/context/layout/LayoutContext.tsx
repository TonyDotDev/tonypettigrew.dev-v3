import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { routes, type Route } from "@/app/routes";

interface LayoutContext {
  isSidebarOpen: boolean;
  toggleSidebar: (open?: boolean) => void;
  openEditors: Route[];
  handleOpenEditor: (editor: Route) => void;
  handleCloseEditor: (editor: Route) => void;
}

const defaultOpenEditors: Route[] = Object.values(routes);

export const LayoutContext = createContext<LayoutContext>({
  isSidebarOpen: false,
  toggleSidebar: () => {},
  openEditors: defaultOpenEditors,
  handleOpenEditor: () => {},
  handleCloseEditor: () => {},
});

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openEditors, setOpenEditors] = useState<Route[]>(defaultOpenEditors);
  const pathname = usePathname();

  const toggleSidebar = (open?: boolean) => {
    setIsSidebarOpen((prev) => {
      return open ?? !prev;
    });
  };

  const handleOpenEditor = (editor: Route) => {
    setOpenEditors((prev) => {
      return [...prev, editor];
    });
  };

  const handleCloseEditor = (editor: Route) => {
    setOpenEditors((prev) => {
      return prev.filter((e) => e !== editor);
    });
  };

  useEffect(() => {
    const hasOpenEditor = openEditors.find(
      (editor) => editor.href === pathname,
    );

    if (!hasOpenEditor) {
      const isMd = pathname.includes("/blog/");

      const label: Route["label"] = isMd
        ? `${pathname.replace("/blog/", "")}.md`
        : `${pathname.replace("/", "")}.tsx`;

      handleOpenEditor({
        label,
        href: pathname as Route["href"],
      });
    }
    // We only want this to run when the pathname changes and when the component mounts NOT when the openEditors state changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
