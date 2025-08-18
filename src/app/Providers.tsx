"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { LayoutProvider } from "@/app/context/layout";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      themes={[
        "light",
        "dark",
        "dracula",
        "onedark",
        "nord",
        "gruvbox",
        "solarized",
      ]}
    >
      <QueryClientProvider client={queryClient}>
        <LayoutProvider>{children}</LayoutProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
