"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MdSearch } from "react-icons/md";
import debounce from "lodash/debounce";

import { useBlogContext } from "@/app/context";

export function BlogSearch() {
  const router = useRouter();
  const {
    searchValue,
    setSearchValue,
    categoryValue,
    setCategoryValue,
    currentSearch,
    currentCategory,
    setIsLoading,
    categories,
  } = useBlogContext();

  const debouncedUpdateSearchParams = useMemo(
    () =>
      debounce((search: string, category: string) => {
        setIsLoading(true);
        const params = new URLSearchParams();

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (category && category !== "all") {
          params.set("category", category);
        }

        const queryString = params.toString();
        const newUrl = queryString ? `/blog?${queryString}` : "/blog";

        router.push(newUrl);
      }, 300),
    [router, setIsLoading],
  );

  // Update local state when URL params change
  useEffect(() => {
    setSearchValue(currentSearch);
    setCategoryValue(currentCategory);
    setIsLoading(false);
  }, [
    currentSearch,
    currentCategory,
    setSearchValue,
    setCategoryValue,
    setIsLoading,
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    debouncedUpdateSearchParams(newValue, categoryValue);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setCategoryValue(newCategory);
    debouncedUpdateSearchParams(searchValue, newCategory);
  };

  return (
    <div className="mb-12 flex items-center gap-2">
      <div className="relative h-10 w-full">
        <input
          type="text"
          placeholder="Search posts, authors, or categories..."
          value={searchValue}
          onChange={handleSearchChange}
          className="border-foreground-secondary bg-background-secondary w-full rounded-md border px-4 py-2"
        />
        <MdSearch className="text-foreground-secondary absolute top-2 right-2 text-2xl" />
      </div>

      <select
        value={categoryValue || "all"}
        onChange={handleCategoryChange}
        className="border-foreground-secondary bg-background-secondary h-10 w-full min-w-40 flex-1 rounded-md border px-4 py-2"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category._id} value={category.slug.current}>
            {category.title}
          </option>
        ))}
      </select>
    </div>
  );
}
