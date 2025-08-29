import {
  GitHubProfileSkeleton,
  PinnedRepositoriesSkeleton,
} from "@/app/RootAppShell/PanelContent/SourceControlContent";
import { PanelContentDivider } from "./PanelContent";

interface SidebarContentSkeletonProps {
  label: string;
}

export const SidebarContentSkeleton = ({
  label,
}: SidebarContentSkeletonProps) => {
  switch (label) {
    case "Source Control":
      return (
        <div className="flex flex-col gap-4">
          <GitHubProfileSkeleton />
          <PanelContentDivider />
          <PinnedRepositoriesSkeleton />
        </div>
      );
    default:
      return null;
  }
};
