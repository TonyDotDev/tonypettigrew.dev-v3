/**
 * Accordion section identifiers for the file explorer
 */
export const EXPLORER_ACCORDIONS = {
  OPEN_EDITORS: "openEditors",
  WWW_TONYPETTIGREW_DEV: "wwwTonypettigrewDev",
  OUTLINE: "outline",
  TIMELINE: "timeline",
} as const;

/**
 * Type for accordion keys
 */
export type ExplorerAccordionKey = keyof typeof EXPLORER_ACCORDIONS;

/**
 * Type for accordion values
 */
export type ExplorerAccordionValue =
  (typeof EXPLORER_ACCORDIONS)[ExplorerAccordionKey];

/**
 * Helper function to get accordion value by key
 */
export const getAccordionValue = (
  key: ExplorerAccordionKey,
): ExplorerAccordionValue => {
  return EXPLORER_ACCORDIONS[key];
};

/**
 * Helper function to get accordion display name
 */
export const getAccordionDisplayName = (
  value: ExplorerAccordionValue,
): string => {
  switch (value) {
    case EXPLORER_ACCORDIONS.OPEN_EDITORS:
      return "Open Editors";
    case EXPLORER_ACCORDIONS.WWW_TONYPETTIGREW_DEV:
      return "www.tonypettigrew.dev";
    case EXPLORER_ACCORDIONS.OUTLINE:
      return "Outline";
    case EXPLORER_ACCORDIONS.TIMELINE:
      return "Timeline";
    default:
      return value;
  }
};
