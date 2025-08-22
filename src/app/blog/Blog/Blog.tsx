"use client";

import { ReactNode } from "react";
import { BlogProvider } from "./BlogContext";
import type { Category } from "@/app/blog/types";

interface BlogProps {
  children: ReactNode;
  initialSearch: string;
  initialCategory: string;
  initialCategories: Category[];
}

export const Blog = ({
  children,
  initialSearch,
  initialCategory,
  initialCategories,
}: BlogProps) => {
  return (
    <BlogProvider
      initialSearch={initialSearch}
      initialCategory={initialCategory}
      initialCategories={initialCategories}
    >
      {children}
    </BlogProvider>
  );
};
