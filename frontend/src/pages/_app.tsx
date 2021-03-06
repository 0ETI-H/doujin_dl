import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { useMediaQuery } from "@material-ui/core";
import { getTheme } from "./theme";
import "@fontsource/roboto";
import "@fontsource/ubuntu";
import { Provider } from "react-redux";
import { store } from "../features/app/store";
export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <React.Fragment>
      <Head>
        <title>Doujin DL</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={getTheme(prefersDarkMode)}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
