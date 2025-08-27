import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { type GitHubRepo, type GitHubReposResponse } from "@/app/types";

// Environment validation
const envSchema = z.object({
  GITHUB_USERNAME: z.string().min(1),
  // Optional token for higher rate limits and private repos
  GITHUB_TOKEN: z.string().optional(),
});

const env = envSchema.parse({
  GITHUB_USERNAME: process.env.GITHUB_USERNAME,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
});

// Fetch repositories from GitHub API
async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const searchParams = new URLSearchParams({
    type: "public",
    sort: "updated",
    direction: "desc",
    per_page: "30",
  });

  // Build headers - token is optional for public repos
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "tonypettigrew.dev",
  };

  // Add authorization header if token is available
  if (env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `https://api.github.com/users/${env.GITHUB_USERNAME}/repos?${searchParams}`,
    {
      headers,
      next: { revalidate: 300 }, // Cache for 5 minutes
    },
  );

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

  const repos: GitHubRepo[] = await response.json();
  return repos;
}

const featuredRepoNames = [
  "tonypettigrew.dev-v3",
  "notion-widget-spotify-now-playing",
  "qbench-bi-dashboard",
];

const pinnedRepoNames = [
  "tonypettigrew.dev",
  "tonypettigrew.dev-v3",
  "express-ts-boilderplate",
  "generator-react-tsx-component",
  "notion-widget-spotify-now-playing",
  "qbench-bi-dashboard",
];

export async function GET(request: NextRequest) {
  try {
    // Validate query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    let validatedParams: { featured: boolean };
    try {
      validatedParams = z
        .object({
          featured: z.coerce.boolean().optional().default(false),
        })
        .parse(queryParams);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            error: "Invalid query parameters",
            details: error.errors,
          },
          { status: 400 },
        );
      }
      throw error;
    }

    // Fetch repositories
    const repos = await fetchGitHubRepos();

    // Filter based on featured parameter
    const filteredRepos = repos.filter((repo) => {
      if (!repo.fork && !repo.archived) {
        if (validatedParams.featured) {
          return featuredRepoNames.includes(repo.name);
        } else {
          return pinnedRepoNames.includes(repo.name);
        }
      }
      return false;
    });

    // Transform data for client (include all required fields)
    const safeRepos = filteredRepos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      clone_url: repo.clone_url,
      ssh_url: repo.ssh_url,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language,
      topics: repo.topics,
      private: repo.private,
      fork: repo.fork,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      homepage: repo.homepage,
      archived: repo.archived,
      disabled: repo.disabled,
      license: repo.license,
    }));

    return NextResponse.json({
      repos: safeRepos,
      total: safeRepos.length,
    } satisfies GitHubReposResponse);
  } catch (error) {
    console.error("GitHub repos API error:", error);

    if (error instanceof Error) {
      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          { error: "GitHub API rate limit exceeded" },
          { status: 429 },
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 },
    );
  }
}
