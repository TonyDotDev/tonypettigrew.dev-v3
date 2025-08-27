import { BlogProvider } from "@/app/context/blog";
import { BlogList } from "@/app/components/blog";
import { type Post } from "@/app/types";
import { Section } from "./Section";

export const BlogSection = ({ posts }: { posts: Post[] }) => {
  return (
    <Section id="recent-blog-posts" title="Recent Blog Posts">
      <BlogProvider initialSearch="" initialCategory="" initialCategories={[]}>
        <BlogList posts={posts} />
      </BlogProvider>
    </Section>
  );
};
