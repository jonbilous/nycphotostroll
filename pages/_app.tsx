import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={client}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
