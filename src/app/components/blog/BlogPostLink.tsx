"use client";

import Link from "next/link";

import { useNavigationState } from "@/app/stores";

interface BlogPostLinkProps {
  post: {
    _id: string;
    title: string;
    excerpt: string;
    slug: { current: string };
  };
}

export const BlogPostLink = ({ post }: BlogPostLinkProps) => {
  const { handleOpenEditor, openEditors } = useNavigationState();

  const handleAddNavigationTab = () => {
    const editorAlreadyOpen = openEditors.find(
      (editor) => editor.href === `/blog/${post.slug.current}`,
    );

    if (!editorAlreadyOpen) {
      handleOpenEditor({
        label: `${post.slug.current}.md`,
        href: `/blog/${post.slug.current}`,
      });
    }
  };

  return (
    <Link
      className="no-underline"
      onClick={handleAddNavigationTab}
      href={`/blog/${post.slug.current}`}
    >
      <h3 className="text-foreground-primary mb-3 text-2xl leading-tight font-bold">
        {post.title}
      </h3>
      <p className="text-foreground-secondary text-md mb-5 leading-relaxed">
        {post.excerpt}
      </p>
    </Link>
  );
};
