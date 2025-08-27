import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { Category } from "@/app/types";

export const getAllCategories = async (): Promise<Category[]> => {
  const query = groq`*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }`;

  return client.fetch(query);
};
