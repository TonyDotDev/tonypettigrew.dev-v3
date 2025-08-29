export const GITHUB_API_BASE_URL = "https://api.github.com";

export const GITHUB_API_ENDPOINTS = {
  USER: (username: string) => `${GITHUB_API_BASE_URL}/users/${username}`,
  USER_REPOS: (username: string) =>
    `${GITHUB_API_BASE_URL}/users/${username}/repos`,
} as const;

export const GITHUB_API_HEADERS = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "tonypettigrew.dev",
} as const;
