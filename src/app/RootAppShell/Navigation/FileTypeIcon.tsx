import {
  getIconName,
  iconMap,
  type Label,
} from "@/app/RootAppShell/Navigation";

interface FileTypeIconProps {
  label: Label;
  className?: string;
}

export const FileTypeIcon = ({ label, className }: FileTypeIconProps) => {
  const iconName = getIconName(label);

  const icon = iconMap[iconName];

  return <div className={className}>{icon}</div>;
};
