import { usePathname, useRouter } from "next/navigation";

import { useExplorerState, useNavigationState } from "@/app/stores";
import { SidebarAccordion } from "@/app/components/SidebarAccordion";
import { NavigationFile } from "@/app/RootAppShell/Navigation";
import { navigateToAdjacentEditor } from "@/app/RootAppShell/navigateToAdjacentEditor";
import { EXPLORER_ACCORDIONS } from "@/app/constants";

export const ExplorerContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { openEditors, handleCloseEditor } = useNavigationState();
  const {
    explorerAccordions,
    toggleExplorerAccordion,
    highlightedExplorerAccordion,
  } = useExplorerState();

  return (
    <div className="flex flex-col">
      <SidebarAccordion
        isExpanded={explorerAccordions[EXPLORER_ACCORDIONS.OPEN_EDITORS]}
        toggleExpanded={() =>
          toggleExplorerAccordion(EXPLORER_ACCORDIONS.OPEN_EDITORS)
        }
        title="open editors"
        isHighlighted={
          highlightedExplorerAccordion === EXPLORER_ACCORDIONS.OPEN_EDITORS
        }
      >
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
      <SidebarAccordion
        isExpanded={
          explorerAccordions[EXPLORER_ACCORDIONS.WWW_TONYPETTIGREW_DEV]
        }
        toggleExpanded={() =>
          toggleExplorerAccordion(EXPLORER_ACCORDIONS.WWW_TONYPETTIGREW_DEV)
        }
        title="www.tonypettigrew.dev"
        isHighlighted={
          highlightedExplorerAccordion ===
          EXPLORER_ACCORDIONS.WWW_TONYPETTIGREW_DEV
        }
      >
        <p>Pages</p>
      </SidebarAccordion>
      <div className="h-px bg-gray-600" />
      <SidebarAccordion
        isExpanded={explorerAccordions[EXPLORER_ACCORDIONS.OUTLINE]}
        toggleExpanded={() =>
          toggleExplorerAccordion(EXPLORER_ACCORDIONS.OUTLINE)
        }
        title="outline"
        isHighlighted={
          highlightedExplorerAccordion === EXPLORER_ACCORDIONS.OUTLINE
        }
      >
        <p>outline</p>
      </SidebarAccordion>
      <div className="h-px bg-gray-600" />
      <SidebarAccordion
        isExpanded={explorerAccordions[EXPLORER_ACCORDIONS.TIMELINE]}
        toggleExpanded={() =>
          toggleExplorerAccordion(EXPLORER_ACCORDIONS.TIMELINE)
        }
        title="timeline"
        isHighlighted={
          highlightedExplorerAccordion === EXPLORER_ACCORDIONS.TIMELINE
        }
      >
        <p>timeline</p>
      </SidebarAccordion>
    </div>
  );
};
