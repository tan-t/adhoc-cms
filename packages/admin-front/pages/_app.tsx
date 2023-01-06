import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  return (
    <ChakraProvider
      theme={extendTheme({
        components: {
          Button: {
            baseStyle: {
              padding: { base: "16px" },
            },
          },
        },
      })}
    >
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
