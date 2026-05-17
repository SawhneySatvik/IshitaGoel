"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HoverPreviewProvider } from "@/components/cursor/HoverPreview";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="ishita-theme"
    >
      <TooltipProvider delay={150}>
        <HoverPreviewProvider>{children}</HoverPreviewProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
