import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { type GitHubRepo, type GitHubReposResponse } from "@/app/types";
import { fetchGitHubResource } from "@/app/api/github/utils";
import { GITHUB_API_ENDPOINTS } from "@/app/api/github/constants";

// Environment validation
const envSchema = z.object({
  GITHUB_USERNAME: z.string().min(1),
});

const env = envSchema.parse({
  GITHUB_USERNAME: process.env.GITHUB_USERNAME,
});

const featuredRepoNames = [
  "tonypettigrew.dev-v3",
  "notion-widget-spotify-now-playing",
  "qbench-bi-dashboard",
];

const pinnedRepoNames = [
  "tonypettigrew.dev",
  "tonypettigrew.dev-v3",
  "express-ts-boilerplate",
  "generator-react-tsx-component",
  "notion-widget-spotify-now-playing",
  "qbench-bi-dashboard",
];

export const GET = async (request: NextRequest) => {
  try {
    // Validate query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    let validatedParams: { featured: boolean };
    try {
      validatedParams = z
        .object({
          featured: z
            .enum(["true", "false"])
            .transform((val) => val === "true")
            .optional()
            .default("false"),
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

    const defaultSearchParams = new URLSearchParams({
      type: "public",
      sort: "updated",
      direction: "desc",
      per_page: "100",
    });

    // Fetch repositories
    const repos = await fetchGitHubResource<GitHubRepo[]>(
      `${GITHUB_API_ENDPOINTS.USER_REPOS(env.GITHUB_USERNAME)}?${defaultSearchParams}`,
    );

    console.log(validatedParams.featured, "validatedParams.featured");

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
};
