import {
  VscFiles,
  VscSearch,
  VscSourceControl,
  VscCommentDiscussion,
} from "react-icons/vsc";
import { AiOutlineSpotify } from "react-icons/ai";
import { BsAlt, BsShift } from "react-icons/bs";

import Tooltip from "@/app/components/Tooltip";
import { useSidebarState } from "@/app/stores";

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

const Sidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const { activeSidebarTab, setActiveSidebarTab, toggleSidebar } =
    useSidebarState();

  const safeId = (label: string) => label.split(" ").join("-");
  const safeAnchorId = (label: string) => `sidebar-${safeId(label)}`;

  return (
    <aside
      className="bg-panel-bg w-sidebar fixed flex h-screen flex-shrink-0 flex-col items-center"
      role="tablist"
      aria-label="Side panel navigation"
    >
      {icons.map((item, idx) => {
        const isActive = activeSidebarTab === idx;

        return (
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
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              className={`border-panel-bg border-border-panel-bg m-0 flex w-full cursor-pointer appearance-none justify-center border-1 border-r-2 border-l-2 py-[12px] shadow-none transition-all duration-300 outline-none ${isActive && isSidebarOpen ? "border-l-panel-highlight text-panel-highlight" : "text-panel-inactive hover:text-panel-highlight border-l-panel-bg"}`}
              aria-label={item.label}
              onClick={() => {
                if (isActive && isSidebarOpen) {
                  // If clicking the active tab and sidebar is open, close it
                  toggleSidebar(false);
                } else {
                  // If clicking an inactive tab or sidebar is closed, open sidebar and switch to that tab
                  toggleSidebar(true);
                  setActiveSidebarTab(idx);
                }
              }}
            >
              {item.icon}
            </button>
          </Tooltip>
        );
      })}
    </aside>
  );
};

export default Sidebar;
