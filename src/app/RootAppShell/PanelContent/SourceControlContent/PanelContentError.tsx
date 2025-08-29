import { VscError } from "react-icons/vsc";
import { Typography } from "@/app/components/typography";

interface PanelContentErrorProps {
  error: Error | null;
}

export const PanelContentError = ({ error }: PanelContentErrorProps) => {
  return (
    <div className="bg-error/10 px-6 py-2">
      <Typography
        variant="span"
        as="p"
        color="error"
        size="sm"
        className="flex items-center gap-1"
      >
        <VscError aria-hidden="true" />
        {error?.message || "Unknown error"}
      </Typography>
    </div>
  );
};
