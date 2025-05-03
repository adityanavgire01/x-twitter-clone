"use client";
import { SessionProvider } from "next-auth/react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import React from "react";

const Provider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props}>
      <SessionProvider>{children}</SessionProvider>
    </NextThemesProvider>
  );
};

export default Provider;
