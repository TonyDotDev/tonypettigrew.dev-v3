import { TbError404 } from "react-icons/tb";

import { Typography } from "@/app/components/typography";

interface ResourceNotFoundProps {
  resource: string;
}

export const ResourceNotFound = ({ resource }: ResourceNotFoundProps) => {
  return (
    <div className="px-6 py-2">
      <Typography
        variant="span"
        as="p"
        color="quaternary"
        size="sm"
        className="flex items-center gap-1"
      >
        <TbError404 aria-hidden="true" />
        {resource} not found
      </Typography>
    </div>
  );
};
