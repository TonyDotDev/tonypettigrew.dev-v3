import { TbPinnedFilled } from "react-icons/tb";
import Link from "next/link";

import { Typography } from "@/app/components/typography";
import { GitHubRepo } from "@/app/types";
import { PinnedRepositoriesSkeleton } from "./PinnedRepositoriesSkeleton";
import { PanelContentError } from "../PanelContentError";
import { ResourceNotFound } from "../ResourceNotFound";

interface PinnedRepositoriesProps {
  repos?: GitHubRepo[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const PinnedRepositories = ({
  repos,
  isLoading,
  isError,
  error,
}: PinnedRepositoriesProps) => {
  if (isLoading) {
    return <PinnedRepositoriesSkeleton />;
  }

  if (isError) {
    return <PanelContentError error={error} />;
  }

  if (!repos) {
    return <ResourceNotFound resource="Repositories" />;
  }

  return (
    <div className="flex flex-col gap-3 px-6 pb-12">
      <Typography
        variant="h5"
        as="h3"
        size="base"
        className="flex items-center gap-1"
      >
        <TbPinnedFilled aria-hidden="true" />
        Pinned Repositories
      </Typography>
      <ul className="flex flex-col gap-6">
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link
              href={repo.html_url}
              className="flex flex-col gap-1 no-underline"
            >
              <Typography variant="span" as="h4" size="sm">
                {repo.name}
              </Typography>
              <Typography variant="span" as="p" color="quaternary" size="sm">
                {repo.description}
              </Typography>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
