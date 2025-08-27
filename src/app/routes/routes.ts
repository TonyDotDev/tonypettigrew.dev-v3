import { type Label } from "@/app/RootAppShell/Navigation";

export const routes = {
  profile: {
    label: "Home.tsx" as Label,
    href: "/",
  },
  blog: {
    label: "Blog.tsx" as Label,
    href: "/blog",
  },
  portfolio: {
    label: "Portfolio.tsx" as Label,
    href: "/portfolio",
  },
  dashboard: {
    label: "Dashboard.tsx" as Label,
    href: "/dashboard",
  },
  contact: {
    label: "Contact.tsx" as Label,
    href: "/contact",
  },
} as const;
