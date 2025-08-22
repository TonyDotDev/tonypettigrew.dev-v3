"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Category } from "@/app/blog/types";

interface BlogContextType {
  // Loading state
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Search state
  searchValue: string;
  setSearchValue: (value: string) => void;
  categoryValue: string;
  setCategoryValue: (value: string) => void;

  // URL state
  currentSearch: string;
  currentCategory: string;

  // Categories
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

interface BlogProviderProps {
  children: ReactNode;
  initialSearch: string;
  initialCategory: string;
  initialCategories: Category[];
}

export function BlogProvider({
  children,
  initialSearch,
  initialCategory,
  initialCategories,
}: BlogProviderProps) {
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
}

export function useBlogContext() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within BlogProvider");
  }
  return context;
}
