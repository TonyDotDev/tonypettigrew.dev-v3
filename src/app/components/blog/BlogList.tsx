"use client";
import Link from "next/link";

import { useBlogContext } from "@/app/context";
import { Categories } from "@/app/blog";
import type { Post } from "@/app/types";
import { Typography } from "@/app/components/typography";
import { BlogListSkeleton } from "./BlogListSkeleton";

interface BlogListProps {
  posts: Post[];
}

export function BlogList({ posts }: BlogListProps) {
  const { isLoading, searchValue, categoryValue } = useBlogContext();

  if (isLoading) {
    return <BlogListSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <Typography variant="h4" as="p" color="secondary">
          {searchValue || categoryValue !== "all"
            ? `No posts found for "${searchValue}"${categoryValue !== "all" ? ` in ${categoryValue ? categoryValue : "all categories"}` : ""}.`
            : "No posts found matching your criteria."}
        </Typography>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-12">
      {posts.map((post) => (
        <li key={post._id}>
          <div className="flex flex-col">
            <Link
              className="mb-4 no-underline"
              href={`/blog/${post.slug.current}`}
            >
              <Typography variant="h3" as="h3" color="primary">
                {post.title}
              </Typography>
              <Typography variant="p" as="p" color="secondary">
                {post.excerpt}
              </Typography>
            </Link>
            <Categories categories={post.categories} />
          </div>
        </li>
      ))}
    </ul>
  );
}
