import Link from "next/link";
import { FaReact } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";

interface NavigationFileProps {
  href: string;
  label: string;
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
      className={`group hover:bg-navigation-file-hover-bg flex items-center py-0.5 pl-5.5 ${isActive ? "bg-navigation-file-active-bg" : ""}`}
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
      <div className="flex items-center gap-2">
        <FaReact className="text-md text-blue-400" aria-hidden />
        <span className="text-foreground-secondary text-sm">{label}</span>
        <span className="text-foreground-tertiary text-xs italic">{`src/app${href === "/" ? "/home" : href}`}</span>
      </div>
    </Link>
  );
};
