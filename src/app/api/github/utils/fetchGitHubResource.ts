import { handleGitHubAPIError } from "./handleGitHubApiError";
import { GITHUB_API_HEADERS } from "../constants";

export const fetchGitHubResource = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(endpoint, {
    headers: GITHUB_API_HEADERS,
    next: { revalidate: 300 },
  });

  handleGitHubAPIError(response);

  const data = await response.json();
  return data;
};
