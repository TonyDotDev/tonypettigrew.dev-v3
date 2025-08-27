import { useCallback, useRef } from "react";

export const useFocusManagement = () => {
  const navigationRef = useRef<HTMLElement>(null);
  const explorerContentRef = useRef<HTMLDivElement>(null);

  const focusNavigation = useCallback(() => {
    // Focus the first navigation tab instead of the nav container
    const firstTab = document.querySelector(".navigation-link");
    if (firstTab) {
      (firstTab as HTMLElement).focus();
    }
  }, []);

  const focusExplorerContent = useCallback(() => {
    // Focus the expanded accordion button (wwwTonypettigrewDev)
    const expandedAccordionButton = document.querySelector(
      'button[aria-expanded="true"]',
    );
    if (expandedAccordionButton) {
      (expandedAccordionButton as HTMLElement).focus();
    } else {
      // Fallback to the first accordion button
      const firstAccordionButton = document.querySelector(
        "button[aria-expanded]",
      );
      if (firstAccordionButton) {
        (firstAccordionButton as HTMLElement).focus();
      } else {
        // Fallback to the explorer content container
        explorerContentRef.current?.focus();
      }
    }
  }, []);

  return {
    navigationRef,
    explorerContentRef,
    focusNavigation,
    focusExplorerContent,
  };
};
