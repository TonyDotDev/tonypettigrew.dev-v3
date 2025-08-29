import { useGitHubUser, useGitHubRepos } from "@/app/hooks";

import { PanelContentDivider } from "@/app/RootAppShell/PanelContent";

import { GitHubProfile } from "./GitHubProfile";
import { PinnedRepositories } from "./PinnedRepositories";

export const SourceControlContent = () => {
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
    isError: isUserError,
  } = useGitHubUser();
  const {
    data: repoData,
    isLoading: isRepoLoading,
    error: repoError,
    isError: isRepoError,
  } = useGitHubRepos();

  const user = userData?.user;
  const repos = repoData?.repos;

  return (
    <div className="flex flex-col gap-2">
      <section>
        <GitHubProfile
          user={user}
          isLoading={isUserLoading}
          isError={isUserError}
          error={userError}
        />
      </section>
      <PanelContentDivider margin="md" />
      <section>
        <PinnedRepositories
          repos={repos}
          isLoading={isRepoLoading}
          isError={isRepoError}
          error={repoError}
        />
      </section>
    </div>
  );
};
