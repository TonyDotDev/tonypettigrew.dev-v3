export function BlogListSkeleton() {
  return (
    <div className="flex flex-col gap-12">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-panel-bg mb-3 h-8 w-3/4 rounded"></div>
          <div className="bg-panel-bg mb-2 h-4 w-full rounded"></div>
          <div className="bg-panel-bg mb-2 h-4 w-2/3 rounded"></div>
          <div className="bg-panel-bg mb-5 h-4 w-1/2 rounded"></div>
          <div className="flex gap-2">
            <div className="bg-panel-bg h-6 w-20 rounded"></div>
            <div className="bg-panel-bg h-6 w-24 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
