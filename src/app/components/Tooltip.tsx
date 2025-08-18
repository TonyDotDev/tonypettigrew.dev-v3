"use client";

import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface TooltipProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  anchorId: string;
}

const Tooltip = ({ children, content, anchorId }: TooltipProps) => {
  return (
    <>
      {children}
      <ReactTooltip
        disableStyleInjection
        opacity={1}
        border="1px solid var(--color-tooltip-border)"
        anchorSelect={`#${anchorId}`}
        place="right"
        offset={3}
        style={{
          backgroundColor: "var(--color-tooltip-bg)",
          color: "var(--color-tooltip-fg)",
          fontSize: "12px",
          padding: "4px 6px",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {content}
      </ReactTooltip>
    </>
  );
};

export default Tooltip;
