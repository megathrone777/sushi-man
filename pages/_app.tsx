import React from "react";
import { AppProps } from "next/app";
import { NotificationsProvider } from "reapop";

import { AppProvider } from "~/store";
import { LanguageProvider } from "../intl/LanguageProvider";

const App = ({ Component, pageProps, router }: AppProps) => (
  <NotificationsProvider>
    <AppProvider>
      <LanguageProvider>
        <Component {...pageProps} key={router.route} />
      </LanguageProvider>

      <style jsx global>{`
        @font-face {
          font-family: "Roboto";
          src: url("/fonts/Roboto-Regular.ttf");
          font-weight: bold;
          font-style: normal;
        }
      `}</style>
    </AppProvider>
  </NotificationsProvider>
);

export default App;
