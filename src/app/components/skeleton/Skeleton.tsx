interface SkeletonProps {
  className?: string;
  rounded?: "md" | "full";
  height?: number;
}

export const Skeleton = ({
  className,
  rounded = "md",
  height = 4,
}: SkeletonProps) => {
  const roundedClass = `rounded-${rounded}`;
  const heightClass = `h-${height}`;

  return (
    <div
      className={`bg-panel-bg ${heightClass} ${roundedClass} ${className}`}
    />
  );
};
