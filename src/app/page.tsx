"use client";

import Image from "next/image";
import { Suspense, lazy, useEffect, useState } from "react";
import { VscArrowDown } from "react-icons/vsc";
import { GoDownload } from "react-icons/go";

import { getMostRecentBlogPosts, NoTabs } from "@/app/home";
import { type Post } from "@/app/types";
import { Typography } from "@/app/components/typography";
import { useLayoutStore } from "@/app/stores";
import { useFocusManagement, useGitHubRepos } from "@/app/hooks";
import { EXPLORER_ACCORDIONS } from "@/app/constants";
import Button from "@/app/components/button";

const RepositoriesSection = lazy(() =>
  import("@/app/home/sections").then((mod) => ({
    default: mod.RepositoriesSection,
  })),
);
const BlogSection = lazy(() =>
  import("@/app/home/sections").then((mod) => ({ default: mod.BlogSection })),
);

const ScrollDownButton = () => {
  const handleScrollDown = () => {
    const blogSection = document.getElementById("recent-blog-posts");

    if (blogSection) {
      blogSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <button
      onClick={handleScrollDown}
      aria-label="Scroll down to recent blog posts"
      className="group text-foreground-primary hover:text-background border-primary hover:bg-primary hover:border-primary bottom-8 cursor-pointer items-center justify-center rounded-full border-2 p-4 transition-all duration-300"
    >
      <VscArrowDown className="h-6 w-6 translate-y-1 animate-bounce" />
    </button>
  );
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [needHelpToggled, setNeedHelpToggled] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getMostRecentBlogPosts();
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  const { data, isLoading, error, isError } = useGitHubRepos(true);

  const openEditors = useLayoutStore((state) => state.openEditors);
  const flashNavigationTabs = useLayoutStore(
    (state) => state.flashNavigationTabs,
  );

  // Focus management
  const { focusNavigation, focusExplorerContent } = useFocusManagement();

  // Custom function to open file explorer and highlight the correct accordion
  const handleOpenFileExplorer = () => {
    const {
      toggleSidebar,
      setActiveSidebarTab,
      flashExplorerAccordion,
      toggleExplorerAccordion,
    } = useLayoutStore.getState();

    // Open sidebar if closed
    if (!useLayoutStore.getState().isSidebarOpen) {
      toggleSidebar(true);
    }

    // Set active tab to explorer (index 0)
    setActiveSidebarTab(0);

    // Open and highlight the wwwTonypettigrewDev accordion (pages)
    toggleExplorerAccordion(EXPLORER_ACCORDIONS.WWW_TONYPETTIGREW_DEV, true);
    flashExplorerAccordion(EXPLORER_ACCORDIONS.WWW_TONYPETTIGREW_DEV);

    // Focus the correct accordion button
    setTimeout(() => {
      const accordionButton = document.querySelector(
        'button[aria-expanded="true"]',
      );
      if (accordionButton) {
        (accordionButton as HTMLElement).focus();
      } else {
        focusExplorerContent();
      }
    }, 100);

    // Announce to screen readers
    import("@/app/utils/accessibility").then(({ announceToScreenReader }) => {
      announceToScreenReader(
        "File explorer opened. Pages section is expanded and highlighted. Focus moved to pages accordion.",
      );
    });
  };

  const hasOpenEditors = openEditors.length > 0;

  if (!hasOpenEditors) {
    return <NoTabs />;
  }

  return (
    <div className="flex flex-col gap-y-24">
      <section className="relative mb-8 flex h-[calc(100vh-120px)] flex-col items-center justify-center gap-5 text-center sm:mb-12 sm:gap-8">
        <div className="sm:h-home-page-image sm:w-home-page-image relative h-24 w-24 flex-shrink-0">
          <Image
            src="/tony-pettigrew.webp"
            alt="Tony Pettigrew"
            fill
            className="rounded-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="h1">Tony Pettigrew</Typography>
          <Typography variant="h5" as="p">
            Frontend Engineer | React | TypeScript
          </Typography>
        </div>
        <Typography variant="h5" as="p" color="tertiary">
          Frontend Engineer focused on scalable solutions, measurable results,
          and seamless user experiences.
        </Typography>
        <div className="mb-4 flex flex-col gap-2">
          <Button
            onClick={() => {
              window.open("/api/resume", "_blank");
            }}
          >
            <GoDownload className="h-4 w-4" />
            Download Resume
          </Button>
          {!needHelpToggled && (
            <Button variant="text" onClick={() => setNeedHelpToggled(true)}>
              Need help navigating the site?
            </Button>
          )}
          {needHelpToggled && (
            <Button variant="text" onClick={() => setNeedHelpToggled(false)}>
              Hide help
            </Button>
          )}
          {needHelpToggled && (
            <>
              {" "}
              <Button
                aria-label="Show navigation tabs"
                variant="outlined"
                onClick={() => flashNavigationTabs(focusNavigation)}
              >
                Navigate using file tabs
              </Button>
              <Button
                aria-label="Show file explorer"
                variant="outlined"
                onClick={handleOpenFileExplorer}
              >
                Re-open closed file tabs
              </Button>
            </>
          )}
        </div>
        <ScrollDownButton />
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogSection posts={posts} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <RepositoriesSection
          repos={data?.repos || []}
          isLoading={isLoading}
          error={error}
          isError={isError}
        />
      </Suspense>
    </div>
  );
}
