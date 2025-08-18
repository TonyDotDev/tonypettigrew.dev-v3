import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscCommentDiscussion,
} from "react-icons/vsc";
import { AiOutlineSpotify } from "react-icons/ai";
import { BsAlt, BsShift } from "react-icons/bs";

import Tooltip from "@/app/components/Tooltip";

const iconSize = 24;
const icons = [
  {
    icon: <VscFiles size={iconSize} />,
    label: "Explorer",
    id: "explorer",
    keyboardShortcut: (
      <span className="flex items-center">
        <BsAlt className="text-[10px]" />
        <BsShift className="text-[10px]" />E
      </span>
    ),
  },
  {
    icon: <VscSearch size={iconSize} />,
    label: "Search",
    id: "search",
    keyboardShortcut: (
      <span className="flex items-center">
        <BsAlt className="text-[10px]" />
        <BsShift className="text-[10px]" />E
      </span>
    ),
  },
  {
    icon: <VscSourceControl size={iconSize} />,
    label: "Source Control",
    id: "source-control",
    keyboardShortcut: (
      <span className="flex items-center">
        <BsAlt className="text-[10px]" />
        <BsShift className="text-[10px]" />G
      </span>
    ),
  },
  {
    icon: <VscCommentDiscussion size={iconSize} />,
    label: "Chat",
    id: "chat",
    keyboardShortcut: (
      <span className="flex items-center">
        <BsAlt className="text-[10px]" />
        <BsShift className="text-[10px]" />C
      </span>
    ),
  },
  {
    icon: <AiOutlineSpotify size={iconSize} />,
    label: "Spotify",
    id: "spotify",
    keyboardShortcut: (
      <span className="flex items-center">
        <BsAlt className="text-[10px]" />
        <BsShift className="text-[10px]" />S
      </span>
    ),
  },
];

const Sidebar = ({
  active = 0,
  onTabChange,
}: {
  active?: number;
  onTabChange?: (index: number) => void;
}) => {
  const safeId = (label: string) => label.split(" ").join("-");
  const safeAnchorId = (label: string) => `sidebar-${safeId(label)}`;

  return (
    <aside
      className="bg-panel-bg flex h-screen w-[50px] flex-col items-center"
      role="tablist"
      aria-label="Side panel navigation"
    >
      {icons.map((item, idx) => (
        <Tooltip
          key={item.label}
          content={
            <span className="flex items-center">
              {item.label} ({item.keyboardShortcut})
            </span>
          }
          anchorId={safeAnchorId(item.label)}
        >
          <button
            id={safeAnchorId(item.label)}
            role="tab"
            aria-selected={active === idx}
            aria-controls={`panel-${item.id}`}
            className={`border-panel-bg m-0 flex w-full cursor-pointer appearance-none justify-center border-0 border-r-2 py-[12px] shadow-none outline-none ${active === idx ? "border-l-panel-highlight text-panel-highlight border-l-2" : "text-panel-inactive hover:text-panel-highlight border-l-panel-bg border-l-2"} `}
            aria-label={item.label}
            onClick={() => onTabChange?.(idx)}
          >
            {item.icon}
          </button>
        </Tooltip>
      ))}
    </aside>
  );
};

export default Sidebar;
