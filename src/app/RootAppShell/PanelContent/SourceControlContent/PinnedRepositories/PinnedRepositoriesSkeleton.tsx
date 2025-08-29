import { Skeleton } from "@/app/components/skeleton";

const PinnedRepositorySkeleton = () => {
  return (
    <div className="flex flex-col gap-1.5">
      <Skeleton className="w-3/4" />
      <div className="flex flex-col gap-1">
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
        <Skeleton className="w-1/2" />
      </div>
    </div>
  );
};

export const PinnedRepositoriesSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 px-6 pb-12">
      <Skeleton className="w-3/4" />
      <PinnedRepositorySkeleton />
      <PinnedRepositorySkeleton />
      <PinnedRepositorySkeleton />
      <PinnedRepositorySkeleton />
      <PinnedRepositorySkeleton />
      <PinnedRepositorySkeleton />
    </div>
  );
};
