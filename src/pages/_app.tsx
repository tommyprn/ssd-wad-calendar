import type { AppProps } from "next/app";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services";

import "@/styles/globals.css";

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />;
    </QueryClientProvider>
  );
}
