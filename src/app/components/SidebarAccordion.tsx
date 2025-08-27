import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { VscChevronRight } from "react-icons/vsc";

export const SidebarAccordion = ({
  id,
  sectionId,
  title,
  children,
  isExpanded,
  toggleExpanded,
  isHighlighted,
}: {
  id?: string;
  sectionId?: string;
  title: string;
  children: React.ReactNode;
  isExpanded?: boolean;
  toggleExpanded?: () => void;
  isHighlighted?: boolean;
}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Measure content height when component mounts or children change
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const accordionId = id || `sidebar-accordion-${uuidv4()}`;
  const accordionSectionId =
    sectionId || `sidebar-accordion-section-${uuidv4()}`;

  return (
    <div
      className={`border-panel-content-bg border-1 transition-all delay-300 ${isHighlighted ? "border-primary animate-pulse" : ""}`}
    >
      <h3 className="px-1 py-1 leading-[0.5]">
        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={toggleExpanded}
          id={accordionId}
          aria-controls={accordionSectionId}
          className="w-full cursor-pointer"
        >
          <span className="flex items-center gap-1">
            <span>
              <VscChevronRight
                className={` ${isExpanded ? "rotate-90" : ""}`}
              />
            </span>
            <span className="text-foreground-secondary text-xs font-semibold uppercase">
              {title}
            </span>
          </span>
        </button>
      </h3>
      <div
        id={accordionSectionId}
        role="region"
        aria-labelledby={accordionId}
        className="overflow-hidden transition-all duration-100 ease-in-out"
        style={{
          maxHeight: isExpanded ? `${contentHeight}px` : "0px",
          opacity: isExpanded ? 1 : 0,
        }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};
