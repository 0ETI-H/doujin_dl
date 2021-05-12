import { createMuiTheme } from "@material-ui/core";

import "@fontsource/roboto";
import "@fontsource/ubuntu";

export const getTheme = (prefersDarkMode: boolean) => {
  return createMuiTheme({
    palette: {
      type: prefersDarkMode ? "dark" : "light",
    },
    typography: {
      h3: {
        fontFamily: "ubuntu",
      },
    },
  });
};
