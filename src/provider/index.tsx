"use client";

import { useRef } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { Toaster } from "sonner";
import Spinner from "@/components/ui/spinner";
import { store, AppStore } from "@/lib/store/store";
import { Provider as ReduxProvider } from "react-redux";

export const Provider = ({ children, ...props }: ThemeProviderProps) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store();
  }
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      enableSystem={true}
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <Toaster
        icons={{ loading: <Spinner size="sm" color="secondary" /> }}
        invert={true}
        pauseWhenPageIsHidden={true}
        theme="system"
        position="bottom-right"
      />
      <ReduxProvider store={storeRef.current}>{children}</ReduxProvider>
    </NextThemesProvider>
  );
};

export default Provider;
