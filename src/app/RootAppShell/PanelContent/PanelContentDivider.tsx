interface PanelContentDividerProps {
  margin?: "none" | "sm" | "md" | "lg";
}

const marginMap = {
  none: "my-0",
  sm: "my-1",
  md: "my-2",
  lg: "my-3",
};

export const PanelContentDivider = ({
  margin = "none",
}: PanelContentDividerProps) => {
  const marginClass = marginMap[margin];

  return (
    <div className={`bg-panel-content-divider h-px w-full ${marginClass}`} />
  );
};
