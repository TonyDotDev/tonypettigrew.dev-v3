"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

import { useLayoutContext } from "@/app/context";

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: {
    asset: { url: string };
    alt?: string;
  };
  categories: Array<{
    title: string;
    slug: { current: string };
  }>;
  author: {
    name: string;
    image: { asset: { url: string } };
  };
}

const getAllBlogPosts = async () => {
  const posts = await client.fetch<Post[]>(`*[_type == "post"] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      asset->{ url },
      alt
    },
    categories[]->{
      title,
      slug,
    },
    author->{
      name,
      image
    }
  }`);
  return posts;
};

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { handleOpenEditor, openEditors } = useLayoutContext();

  useEffect(() => {
    const fetchPosts = async () => {
      const posts: Post[] = await getAllBlogPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold">Blog Posts</h1>
      <ul>
        {posts.map((post) => {
          const handleAddNavigationTab = () => {
            const editorAlreadyOpen = openEditors.find(
              (editor) => editor.href === `/blog/${post.slug.current}`,
            );

            if (editorAlreadyOpen) {
              return null;
            }
            handleOpenEditor({
              label: `${post.slug.current}.md`,
              href: `/blog/${post.slug.current}`,
            });
          };

          return (
            <li key={post._id}>
              <Link
                onClick={handleAddNavigationTab}
                href={`/blog/${post.slug.current}`}
              >
                {post.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
