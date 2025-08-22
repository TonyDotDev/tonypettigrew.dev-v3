import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { Post } from "./types";

export async function getAllBlogPosts(
  search?: string,
  category?: string,
): Promise<Post[]> {
  const searchFilter = search
    ? groq`&& (
        title match "*${search}*" || 
        excerpt match "*${search}*" ||
        body match "*${search}*" ||
        author->name match "*${search}*" ||
        categories[]->title match "*${search}*" ||
        categories[]->slug.current match "*${search}*"
      )`
    : "";

  const categoryFilter = category
    ? groq`&& "${category}" in categories[]->slug.current`
    : "";

  const query = groq`*[_type == "post" ${searchFilter} ${categoryFilter}] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    slug,
    publishedAt,
    author->{
      name,
      image{
        asset->{
          url
        }
      }
    },
    categories[]->{
      title,
      slug
    }
  }`;

  return client.fetch(query);
}
