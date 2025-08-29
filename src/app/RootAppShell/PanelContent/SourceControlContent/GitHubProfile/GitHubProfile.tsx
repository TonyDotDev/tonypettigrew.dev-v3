import { FaLocationDot } from "react-icons/fa6";

import { Typography } from "@/app/components/typography";
import { GitHubUser } from "@/app/types";
import Avatar from "@/app/components/Avatar";
import { PanelContentDivider } from "@/app/RootAppShell/PanelContent";
import { GitHubProfileSkeleton } from "./GitHubProfileSkeleton";
import { PanelContentError } from "../PanelContentError";
import { ResourceNotFound } from "../ResourceNotFound";

interface GitHubProfileProps {
  user?: GitHubUser;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const GitHubProfile = ({
  user,
  isLoading,
  isError,
  error,
}: GitHubProfileProps) => {
  if (isLoading) {
    return <GitHubProfileSkeleton />;
  }

  if (isError) {
    return <PanelContentError error={error} />;
  }

  if (!user) {
    return <ResourceNotFound resource="User" />;
  }

  return (
    <div className="flex flex-col items-center gap-1 pt-2">
      <div className="mb-1 flex gap-4">
        <Avatar
          src={user.avatar_url}
          alt={user.name}
          size="md"
          className="flex-shrink-0"
        />
        <div className="flex flex-col">
          <Typography variant="h5" as="h3" size="base">
            {user.name}
          </Typography>
          <Typography
            variant="span"
            as="p"
            color="quaternary"
            size="sm"
          >{`@${user.login}`}</Typography>
          <Typography
            variant="span"
            as="p"
            color="quaternary"
            size="sm"
            className="flex items-center gap-1"
          >
            <FaLocationDot aria-hidden="true" />
            {user.location}
          </Typography>
        </div>
      </div>
      <PanelContentDivider margin="md" />
      <div className="flex items-center gap-2">
        <Typography variant="span" as="p" color="quaternary" size="sm">
          {user.followers} followers
        </Typography>
        <Typography
          aria-hidden="true"
          variant="h4"
          color="quaternary"
          size="lg"
        >
          •
        </Typography>
        <Typography variant="span" as="p" color="quaternary" size="sm">
          {user.following} following
        </Typography>
      </div>
      <Typography
        variant="span"
        as="p"
        color="secondary"
        size="sm"
        className="px-4 text-center"
      >
        {user.bio}
      </Typography>

      {user.hireable && (
        <div className="mt-2 flex items-center gap-2">
          <div className="relative">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75"></div>
          </div>
          <Typography
            variant="span"
            as="span"
            className="font-medium text-green-600"
            size="sm"
          >
            Available for hire
          </Typography>
        </div>
      )}
    </div>
  );
};
