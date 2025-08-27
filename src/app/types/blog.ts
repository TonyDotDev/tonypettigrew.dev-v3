export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
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

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}
