import { Blog, BlogSearch, BlogList } from "./Blog";
import { getAllBlogPosts } from "./getAllBlogPosts";
import { getAllCategories } from "./getAllCategories";

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
      <h1 className="mb-2 text-5xl font-bold">Blog Posts</h1>
      <p className="text-foreground-secondary mb-4">
        A collection of my thoughts and experiences.
      </p>

      <Blog
        initialSearch={search || ""}
        initialCategory={category || ""}
        initialCategories={categories}
      >
        <BlogSearch />

        <BlogList posts={posts} />
      </Blog>
    </div>
  );
}
