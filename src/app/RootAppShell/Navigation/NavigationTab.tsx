import Link from "next/link";
import { useState, useEffect } from "react";
import { VscClose } from "react-icons/vsc";

import { FileTypeIcon } from "./FileTypeIcon";
import { type Label } from "./getIconName";
import { useNavigationState } from "@/app/stores";

interface NavigationTabProps {
  label: Label;
  isActive?: boolean;
  href: string;
  handleClose: () => void;
  index?: number;
}

export const NavigationTab = ({
  label,
  isActive,
  href,
  handleClose,
  index = 0,
}: NavigationTabProps) => {
  const { isNavigationHighlighted } = useNavigationState();
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleClose();
  };

  const handleCloseKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      handleClose();
    }
  };

  const staggerDelay = index * 75; // 100ms delay per tab

  useEffect(() => {
    if (isNavigationHighlighted) {
      const timer = setTimeout(() => {
        setIsHighlighted(true);
      }, staggerDelay);

      return () => {
        clearTimeout(timer);
        setIsHighlighted(false);
      };
    } else {
      setIsHighlighted(false);
    }
  }, [isNavigationHighlighted, staggerDelay]);

  // Generate unique IDs for ARIA relationships
  const tabId = `nav-tab-${index}`;
  const closeButtonId = `nav-tab-close-${index}`;

  return (
    <Link
      id={tabId}
      role="tab"
      className={`navigation-link group text-foreground-primary flex h-full items-center gap-1 border-1 px-3 pr-1 text-sm no-underline transition-all duration-300 ${
        isActive
          ? "bg-background border-background"
          : "bg-navigation-tab-inactive-bg border-navigation-tab-inactive-bg"
      } ${isHighlighted ? `border-primary animate-pulse` : ""}`}
      href={href}
      aria-current={isActive ? "page" : undefined}
      aria-describedby={isActive ? closeButtonId : undefined}
    >
      <div className="flex items-center gap-2">
        <FileTypeIcon label={label} />
        <span
          className={`mr-0.5 ${isActive ? "text-foreground-primary" : "text-foreground-quaternary"}`}
        >
          {label}
        </span>
      </div>
      <button
        id={closeButtonId}
        onClick={handleCloseClick}
        onKeyDown={handleCloseKeyDown}
        className={`hover:bg-close-button-hover-bg focus:bg-close-button-hover-bg cursor-pointer rounded-md p-0.5 transition-colors duration-200 ${
          isActive
            ? "visible"
            : "invisible group-focus-within:visible group-hover:visible"
        }`}
        aria-label={`Close ${label} tab`}
        title={`Close ${label} tab`}
      >
        <VscClose
          className={`text-lg ${isActive ? "text-foreground" : "text-foreground-quaternary"}`}
          aria-hidden="true"
        />
      </button>
    </Link>
  );
};
