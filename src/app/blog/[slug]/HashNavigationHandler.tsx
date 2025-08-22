"use client";

import { useEffect } from "react";
import { useHash } from "@/app/hooks";

interface HashNavigationHandlerProps {
  children: React.ReactNode;
}

export const HashNavigationHandler = ({
  children,
}: HashNavigationHandlerProps) => {
  const hash = useHash();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        }
      }, 100);
    }
  }, [hash]);

  return <>{children}</>;
};
