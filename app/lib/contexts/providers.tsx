"use client";
import ToasterProvider from "@/app/lib/contexts/toasterProvider";
import { Normal } from "@/app/lib/types/types";
import { AuthProvider } from "@/app/lib/contexts/authProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function Providers({ children }: Normal) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToasterProvider>
          <AuthProvider>{children}</AuthProvider>
        </ToasterProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
