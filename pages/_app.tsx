import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <UserProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
