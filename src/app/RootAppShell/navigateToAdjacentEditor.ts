"use client";

import { useRouter } from "next/navigation";

import { OpenEditor } from "@/app/context/layout";

type Router = ReturnType<typeof useRouter>;

export const navigateToAdjacentEditor = (
  openEditors: OpenEditor[],
  editor: OpenEditor,
  router: Router,
) => {
  const currentIndex = openEditors.findIndex((e) => e.href === editor.href);
  const newEditors = openEditors.filter((e) => e.href !== editor.href);

  if (newEditors.length === 0) {
    router.push("/");
  } else if (currentIndex < newEditors.length) {
    router.push(newEditors[currentIndex].href);
  } else {
    router.push(newEditors[currentIndex - 1].href);
  }
};
