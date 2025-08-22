"use client";

import { useBlogContext } from "./BlogContext";
import { BlogListSkeleton } from "./BlogListSkeleton";
import { Categories } from "@/app/blog";
import type { Post } from "../types";
import Link from "next/link";

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
        <p className="text-foreground-secondary text-lg">
          {searchValue || categoryValue !== "all"
            ? `No posts found for "${searchValue}"${categoryValue !== "all" ? ` in ${categoryValue ? categoryValue : "all categories"}` : ""}.`
            : "No posts found matching your criteria."}
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-12">
      {posts.map((post) => (
        <li key={post._id}>
          <div className="flex flex-col">
            <Link className="no-underline" href={`/blog/${post.slug.current}`}>
              <h3 className="text-foreground-primary mb-3 text-2xl leading-tight font-bold">
                {post.title}
              </h3>

              <p className="text-foreground-secondary text-md mb-5 leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
            <Categories categories={post.categories} />
          </div>
        </li>
      ))}
    </ul>
  );
}
