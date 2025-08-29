// GitHub Repository types
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  ssh_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  private: boolean;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  archived: boolean;
  disabled: boolean;
  license: GitHubLicense | null;
}

export interface GitHubUser {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  bio: string | null;
  location: string | null;
  hireable: boolean | null;
}

// GitHub field type
interface GitHubLicense {
  key: string;
  name: string;
  url: string | null;
}

// API Response types
export interface GitHubReposResponse {
  repos: GitHubRepo[];
  total: number;
}

export interface GitHubUserResponse {
  user: GitHubUser;
}
