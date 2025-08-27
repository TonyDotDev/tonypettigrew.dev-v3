"use client";

import { BlogContext } from "./BlogContext";
import { useState, ReactNode } from "react";
import type { Category } from "@/app/types";

interface BlogProviderProps {
  children: ReactNode;
  initialSearch: string;
  initialCategory: string;
  initialCategories: Category[];
}

export const BlogProvider = ({
  children,
  initialSearch,
  initialCategory,
  initialCategories,
}: BlogProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [categoryValue, setCategoryValue] = useState(initialCategory);
  const [categories, setCategories] = useState(initialCategories);

  return (
    <BlogContext.Provider
      value={{
        isLoading,
        setIsLoading,
        searchValue,
        setSearchValue,
        categoryValue,
        setCategoryValue,
        currentSearch: initialSearch,
        currentCategory: initialCategory,
        categories,
        setCategories,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
