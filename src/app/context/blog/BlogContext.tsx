"use client";

import { createContext } from "react";
import type { Category } from "@/app/types";

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

export const BlogContext = createContext<BlogContextType | undefined>(
  undefined,
);
