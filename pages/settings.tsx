import React from "react";
import { NextPage } from "next";

import { ThemeProvider, theme } from "~/theme";
import { Settings } from "~/components";

const SettingsPage: NextPage = () => (
  <ThemeProvider theme={theme}>
    <Settings />
  </ThemeProvider>
);

export default SettingsPage;
