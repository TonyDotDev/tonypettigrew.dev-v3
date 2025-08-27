import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import type { Post } from "@/app/types";

const COUNT = 3;

export const getMostRecentBlogPosts = async (
  count: number = COUNT,
): Promise<Post[]> => {
  const query = groq`*[_type == "post"] | order(publishedAt desc)[0...${count}] {
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
};
