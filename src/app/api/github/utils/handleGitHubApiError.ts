export const handleGitHubAPIError = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error("GitHub API error:", response.status, errorText);

    if (response.status === 401) {
      throw new Error("GitHub authentication failed");
    } else if (response.status === 403) {
      throw new Error("GitHub API rate limit exceeded");
    } else if (response.status === 404) {
      throw new Error("GitHub user not found");
    } else {
      throw new Error(`GitHub API error: ${response.status}`);
    }
  }
};
