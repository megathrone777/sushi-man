import React from "react";

import { AppPropsType } from "next/dist/next-server/lib/utils";
import { NotificationsProvider } from "reapop";

import { AppProvider } from "~/store";
import { LanguageProvider } from "../intl/LanguageProvider";

const App = ({ Component, pageProps, router }: AppPropsType) => (
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
