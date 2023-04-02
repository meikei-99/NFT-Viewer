import "@/styles/globals.css";
const queryClient = new QueryClient();
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { MoralisProvider } from "react-moralis";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
    </MoralisProvider>
  );
}
