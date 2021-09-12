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
          font-family: "Montserrat";
          font-style: normal;
          src: url("/fonts/Montserrat-Regular.ttf");
        }

        @font-face {
          font-family: "MontserratSemiBold";
          font-style: normal;
          src: url("/fonts/Montserrat-SemiBold.ttf");
        }

        @font-face {
          font-family: "MontserratBold";
          font-style: normal;
          src: url("/fonts/Montserrat-Bold.ttf");
        }

        @font-face {
          font-family: "MontserratExtraBold";
          font-style: normal;
          src: url("/fonts/Montserrat-ExtraBold.ttf");
        }

        @font-face {
          font-family: "MontserratBlack";
          font-style: normal;
          src: url("/fonts/Montserrat-Black.ttf");
        }
      `}</style>
    </AppProvider>
  </NotificationsProvider>
);

export default App;
