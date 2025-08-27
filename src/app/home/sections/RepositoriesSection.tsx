import { GitHubRepos } from "@/app/components/GithubRepos";
import { Typography } from "@/app/components/typography";
import { GitHubRepo } from "@/app/types/github";

import { Section } from "./Section";

export const RepositoriesSection = ({
  repos,
  isLoading,
  error,
  isError,
}: {
  repos: GitHubRepo[];
  isLoading: boolean;
  error: Error | null;
  isError: boolean;
}) => {
  return (
    <Section title="Featured Repositories">
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="py-8 text-center">
          <Typography variant="h6" color="primary">
            Failed to load repositories
          </Typography>
          <Typography variant="p" color="tertiary" className="mt-2">
            {error?.message || "Please try again later"}
          </Typography>
        </div>
      ) : (
        <GitHubRepos repos={repos} />
      )}
    </Section>
  );
};
