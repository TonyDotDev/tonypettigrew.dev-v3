import { VscMarkdown } from "react-icons/vsc";
import { FaReact } from "react-icons/fa";

export const iconMap = {
  md: <VscMarkdown className="text-md text-blue-300" aria-hidden />,
  tsx: <FaReact className="text-md text-blue-400" aria-hidden />,
} as const;

export type Label = `${string}.${keyof typeof iconMap}`;

export const getIconName = (label: Label) => {
  if (label.endsWith(".md")) {
    return "md";
  }
  return "tsx";
};
