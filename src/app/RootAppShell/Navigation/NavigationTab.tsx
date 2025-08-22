import Link from "next/link";
import { VscClose } from "react-icons/vsc";

import { FileTypeIcon } from "./FileTypeIcon";
import { type Label } from "./getIconName";

interface NavigationTabProps {
  label: Label;
  isActive?: boolean;
  href: string;
  handleClose: () => void;
}

export const NavigationTab = ({
  label,
  isActive,
  href,
  handleClose,
}: NavigationTabProps) => {
  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <Link
      className={`navigation-link group text-foreground-primary flex h-full items-center gap-1 px-3 pr-1 text-sm no-underline ${
        isActive ? "bg-background" : "bg-navigation-tab-inactive-bg"
      }`}
      href={href}
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
        onClick={handleCloseClick}
        className={`hover:bg-close-button-hover-bg cursor-pointer rounded-md p-0.5 ${
          isActive ? "visible" : "invisible group-hover:visible"
        }`}
      >
        <VscClose
          className={`text-lg ${isActive ? "text-foreground" : "text-foreground-quaternary"}`}
        />
      </button>
    </Link>
  );
};
