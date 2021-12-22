import React from "react";
import Script from "next/script";
import { AppProps } from "next/app";
import { NotificationsProvider } from "reapop";

import { LanguageProvider } from "../intl/LanguageProvider";
import { AppProvider } from "~/store/context";

const App = ({ Component, pageProps, router }: AppProps) => (
  <>
    <Script
      id="google-maps"
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAelVTTeDWjXmX7yF_m83ebT7GbJZsNaUY&libraries=places"
      strategy="beforeInteractive"
    />
    <Script
      id="googleTagManager"
      src="https://www.googletagmanager.com/gtag/js?id=G-CEW5H8WB6K"
      strategy="beforeInteractive"
    />
    <Script id="google" strategy="afterInteractive" src="/js/google.js" />
    <Script id="facebook" strategy="afterInteractive" src="/js/facebook.js" />
    <Script id="yandex" strategy="afterInteractive" src="/js/yandex.js" />
    <AppProvider>
      <NotificationsProvider>
        <LanguageProvider>
          <Component {...pageProps} key={router.route} />
        </LanguageProvider>

        <style jsx global>{`
          @font-face {
            font-family: "Avenir";
            font-style: normal;
            src: url("/fonts/AvenirNext-Regular.woff");
          }
          @font-face {
            font-family: "AvenirBold";
            font-style: normal;
            src: url("/fonts/AvenirNext-Bold.woff");
          }
          @font-face {
            font-family: "AvenirMedium";
            font-style: normal;
            src: url("/fonts/AvenirNext-Medium.woff");
          }
        `}</style>
      </NotificationsProvider>
    </AppProvider>
  </>
);

export default App;
