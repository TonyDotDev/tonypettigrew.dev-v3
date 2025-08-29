import { z } from "zod";
import { NextResponse } from "next/server";

import { type GitHubUser, type GitHubUserResponse } from "@/app/types";
import { fetchGitHubResource } from "@/app/api/github/utils";
import { GITHUB_API_ENDPOINTS } from "@/app/api/github/constants";

// Environment validation
const envSchema = z.object({
  GITHUB_USERNAME: z.string().min(1),
});

const env = envSchema.parse({
  GITHUB_USERNAME: process.env.GITHUB_USERNAME,
});

export const GET = async () => {
  try {
    const user = await fetchGitHubResource<GitHubUser>(
      GITHUB_API_ENDPOINTS.USER(env.GITHUB_USERNAME),
    );

    const userFields: GitHubUser = {
      id: user.id,
      login: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
      followers: user.followers,
      following: user.following,
      bio: user.bio,
      location: user.location,
      hireable: user.hireable,
    };

    return NextResponse.json({
      user: userFields,
    } satisfies GitHubUserResponse);
  } catch (error) {
    console.error("GitHub user API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
};
