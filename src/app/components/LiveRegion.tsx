"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { setGlobalAnnounce } from "@/app/utils/accessibility";

interface LiveRegionContextType {
  announce: (message: string, priority?: "polite" | "assertive") => void;
}

const LiveRegionContext = createContext<LiveRegionContextType | null>(null);

export const useLiveRegion = () => {
  const context = useContext(LiveRegionContext);
  if (!context) {
    throw new Error("useLiveRegion must be used within LiveRegionProvider");
  }
  return context;
};

export const LiveRegionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"polite" | "assertive">("polite");

  const announce = (
    newMessage: string,
    newPriority: "polite" | "assertive" = "polite",
  ) => {
    // Clear first, then set new message to ensure screen readers detect the change
    setMessage("");
    setPriority(newPriority);

    // Use setTimeout to ensure the clear happens first
    setTimeout(() => {
      setMessage(newMessage);

      // Clear the message after a longer delay to ensure it's announced
      setTimeout(() => {
        setMessage("");
      }, 2000); // Longer delay for screen readers
    }, 50);
  };

  // Set the global announcement function so the store can use it
  useEffect(() => {
    setGlobalAnnounce(announce);
  }, []);

  return (
    <LiveRegionContext.Provider value={{ announce }}>
      {children}

      {/* Persistent live region for screen readers */}
      <div
        aria-live={priority}
        aria-atomic="true"
        className="sr-only"
        role="status"
        aria-label="Screen reader announcements"
        id="live-region"
      >
        {message}
      </div>
    </LiveRegionContext.Provider>
  );
};
