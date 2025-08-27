import { BlogProvider } from "@/app/context";
import { BlogSearch, BlogList } from "@/app/components/blog";
import { getAllBlogPosts } from "./getAllBlogPosts";
import { getAllCategories } from "./getAllCategories";
import { Typography } from "@/app/components/typography";

interface BlogPageProps {
  searchParams: {
    search?: string;
    category?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { search, category } = await searchParams;

  // Fetch posts and categories in parallel
  const [posts, categories] = await Promise.all([
    getAllBlogPosts(search, category),
    getAllCategories(),
  ]);

  return (
    <div>
      <Typography variant="h1" className="mb-2">
        Blog Posts
      </Typography>
      <Typography variant="p" as="p" color="secondary" className="mb-4">
        A collection of my thoughts and experiences.
      </Typography>
      <BlogProvider
        initialSearch={search || ""}
        initialCategory={category || ""}
        initialCategories={categories || []}
      >
        <BlogSearch />

        <BlogList posts={posts} />
      </BlogProvider>
    </div>
  );
}
