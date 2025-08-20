"use client";

import { useRouter } from "next/navigation";

import { type Route, routes } from "@/app/routes";

type Router = ReturnType<typeof useRouter>;

export const navigateToAdjacentEditor = (
  openEditors: Route[],
  editor: Route,
  router: Router,
) => {
  const currentIndex = openEditors.findIndex((e) => e.href === editor.href);
  const newEditors = openEditors.filter((e) => e.href !== editor.href);

  if (newEditors.length === 0) {
    router.push("/");
  } else if (
    openEditors.find((e) => e.href === "/blog") &&
    editor.href.includes("/blog/")
  ) {
    router.push(routes.blog.href);
  } else if (currentIndex < newEditors.length) {
    router.push(newEditors[currentIndex].href);
  } else {
    router.push(newEditors[currentIndex - 1].href);
  }
};
