import { usePathname, useRouter } from "next/navigation";

import { SidebarAccordion } from "@/app/components/SidebarAccordion";
import { NavigationFile } from "@/app/RootAppShell/Navigation";
import { useLayoutContext } from "@/app/context/layout";
import { navigateToAdjacentEditor } from "../navigateToAdjacentEditor";

export const ExplorerContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { openEditors, handleCloseEditor } = useLayoutContext();

  return (
    <div className="flex flex-col">
      <SidebarAccordion title="open editors">
        <ul>
          {openEditors.map((editor) => {
            const isActive = pathname === editor.href;
            const handleClose = () => {
              handleCloseEditor(editor);
              if (isActive) {
                navigateToAdjacentEditor(openEditors, editor, router);
              }
            };

            return (
              <li className="flex-shrink-0 overflow-hidden" key={editor.href}>
                <NavigationFile
                  href={editor.href}
                  label={editor.label}
                  isActive={isActive}
                  handleClose={handleClose}
                />
              </li>
            );
          })}
        </ul>
      </SidebarAccordion>
      <div className="h-px bg-gray-600" />
      <SidebarAccordion title="www.tonypettigrew.dev">
        <p>Pages</p>
      </SidebarAccordion>
      <div className="h-px bg-gray-600" />
      <SidebarAccordion title="outline">
        <p>outline</p>
      </SidebarAccordion>
      <div className="h-px bg-gray-600" />
      <SidebarAccordion title="timeline">
        <p>timeline</p>
      </SidebarAccordion>
    </div>
  );
};
