import { ApolloProvider } from "@apollo/client";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import useDarkMode, { DarkMode } from "use-dark-mode";
import "../styles/globals.css";

import { useApollo } from "../apollo/apolloClient";
import { lightTheme, darkTheme, GlobalStyles } from "../themeConfig";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const [isMounted, setIsMounted] = useState(false);
  const darkmode: DarkMode = useDarkMode(true);
  const theme = darkmode.value ? darkTheme : lightTheme;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {isMounted && <Component {...pageProps} darkmode={darkmode} />}
      </ThemeProvider>
    </ApolloProvider>
  );
}
export default MyApp;