import { useQuery } from "@tanstack/react-query";
import { type GitHubUserResponse } from "@/app/types";

const fetchGitHubUser = async (): Promise<GitHubUserResponse> => {
  const response = await fetch("/api/github/user");

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  return response.json();
};

export function useGitHubUser() {
  return useQuery({
    queryKey: ["github", "user"],
    queryFn: () => fetchGitHubUser(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
