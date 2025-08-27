import { useQuery } from "@tanstack/react-query";
import { type GitHubReposResponse } from "@/app/types";

async function fetchGitHubRepos(
  featured: boolean = false,
): Promise<GitHubReposResponse> {
  const response = await fetch(`/api/github/repos?featured=${featured}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.statusText}`);
  }

  return response.json();
}

export function useGitHubRepos(featured: boolean = false) {
  return useQuery({
    queryKey: ["github", "repos", { featured }],
    queryFn: () => fetchGitHubRepos(featured),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
