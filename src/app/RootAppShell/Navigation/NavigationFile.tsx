import Link from "next/link";
import { VscClose } from "react-icons/vsc";

import { FileTypeIcon, type Label } from "@/app/RootAppShell/Navigation";

interface NavigationFileProps {
  href: string;
  label: Label;
  isActive: boolean;
  handleClose: () => void;
}

export const NavigationFile = ({
  href,
  label,
  isActive,
  handleClose,
}: NavigationFileProps) => {
  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <Link
      className={`navigation-link group hover:bg-navigation-file-hover-bg flex items-center py-0.5 pl-5.5 no-underline ${isActive ? "bg-navigation-file-active-bg" : ""}`}
      href={href}
    >
      <button
        onClick={handleCloseClick}
        className={`hover:bg-close-button-hover-bg cursor-pointer rounded-md p-0.5 ${
          isActive ? "visible" : "invisible group-hover:visible"
        }`}
      >
        <VscClose className="text-foreground-secondary text-md" />
      </button>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <FileTypeIcon className="flex-shrink-0" label={label} />
        <span className="text-foreground-secondary max-w-[100%] min-w-0 truncate text-sm">
          {label}
        </span>
        <span className="text-foreground-tertiary min-w-0 flex-1 truncate text-xs italic">{`src/app${href === "/" ? "/home" : href}`}</span>
      </div>
    </Link>
  );
};
