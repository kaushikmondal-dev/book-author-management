"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ComponentProps, useEffect } from "react";
import { Toaster } from "../shadcnui/toast";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("Encountered a script tag while rendering")
      ) {
        return;
      }
      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <NextThemesProvider {...props}>
      {children}

      <Toaster timeout={2000} />
    </NextThemesProvider>
  );
};

export default ThemeProvider;
