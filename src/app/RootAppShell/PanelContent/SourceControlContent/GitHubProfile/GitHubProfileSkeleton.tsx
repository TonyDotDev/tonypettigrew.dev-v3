import { Skeleton } from "@/app/components/skeleton";
import { PanelContentDivider } from "../..";

export const GitHubProfileSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-2 pt-2">
      <div className="mb-1 flex gap-4">
        <Skeleton height={16} rounded="full" className="w-16" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-24" />
          <Skeleton className="w-32" />
          <Skeleton className="w-32" />
        </div>
      </div>
      <PanelContentDivider margin="lg" />
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <Skeleton className="w-24" />
          <Skeleton className="w-24" />
        </div>
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-32" />
      </div>
    </div>
  );
};
