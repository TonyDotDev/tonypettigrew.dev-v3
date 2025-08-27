import Link from "next/link";

import { type Post } from "@/app/blog";

interface CategoriesProps {
  categories: Post["categories"];
}

export const Categories = ({ categories }: CategoriesProps) => {
  return (
    <ul className="flex flex-wrap items-start gap-2 text-sm leading-relaxed">
      {categories.map((category: Post["categories"][number]) => (
        <li key={category.slug.current} className="flex">
          <Link
            className="bg-primary bg-background-primary !text-foreground-primary rounded-sm px-2 py-1.5 no-underline"
            href={`/blog?category=${category.slug.current}`}
          >
            {category.title.toLowerCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
};
