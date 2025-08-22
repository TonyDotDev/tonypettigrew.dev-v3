import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";
import { MdCalendarToday, MdAccessTime } from "react-icons/md";
import { Metadata } from "next";
import Link from "next/link";

import { formatDate } from "@/lib";
import { getReadTime, type Post } from "@/app/blog";
import { Categories } from "@/app/blog";
import { HashNavigationHandler } from "./HashNavigationHandler";

interface BlogPost extends Post {
  body: string;
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const post = await client.fetch<BlogPost>(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      body,
      mainImage {
        asset->{ url },
        alt
      },
      author->{
        name,
        image {
          asset->{ url }
        }
      },
      categories[]->{
        title,
        slug
      }
    }`,
    {
      slug,
    },
  );

  if (!post) {
    // TODO: Navigate to 404 page AND don't allow a file tab or navigation file to be created in the open editors
    return <div>Post not found</div>;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    datePublished: post.publishedAt,
    // "dateModified": post.updatedAt || post.publishedAt,
    image: post.mainImage?.asset.url,
    description: post.body.slice(0, 160) + "...",
  };

  const readingTime = getReadTime(post.body);

  const generateId = (children: React.ReactNode) => {
    return children?.toString().toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <HashNavigationHandler>
      <header>
        <h1 className="mb-6 text-4xl font-bold">{post.title}</h1>
        <div className="mb-6 flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={post.author.image.asset.url}
                alt={post.author.name}
                width={60}
                height={60}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-foreground-primary text-md">
              {post.author.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MdCalendarToday className="text-foreground-secondary text-md" />
            <time
              dateTime={post.publishedAt}
              className="text-foreground-secondary text-md"
            >
              Published on {formatDate(post.publishedAt)}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <MdAccessTime className="text-foreground-secondary text-md" />
            <span className="text-foreground-secondary text-md">
              {readingTime} min read
            </span>
          </div>
        </div>
        <div className="mb-6">
          <Categories categories={post.categories} />
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 id={generateId(children)}>{children}</h1>,
            h2: ({ children }) => <h2 id={generateId(children)}>{children}</h2>,
            h3: ({ children }) => <h3 id={generateId(children)}>{children}</h3>,
            h4: ({ children }) => <h4 id={generateId(children)}>{children}</h4>,
            h5: ({ children }) => <h5 id={generateId(children)}>{children}</h5>,
            h6: ({ children }) => <h6 id={generateId(children)}>{children}</h6>,
            code: ({ className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              const isInline = !match;
              return !isInline ? (
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            a: ({ href, children }) => (
              <Link href={href || "#"} className="no-underline">
                {children}
              </Link>
            ),
          }}
        >
          {post.body}
        </ReactMarkdown>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </HashNavigationHandler>
  );
}

// Add this function to your BlogPost component
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await client.fetch<BlogPost>(
    groq`*[_type == "post" && slug.current == $slug][0] {
      title,
      body,
      mainImage {
        asset->{ url }
      },
      author->{ name }
    }`,
    { slug },
  );

  if (!post) {
    return { title: "Post not found" };
  }

  // Create description from body content
  const description = post.body.slice(0, 160) + "...";

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      images: post.mainImage ? [post.mainImage.asset.url] : [],
      type: "article",
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.mainImage ? [post.mainImage.asset.url] : [],
    },
  };
}
