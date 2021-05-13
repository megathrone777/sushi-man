import React from "react";
import Head from "next/head";
import NotificationsSystem, { useNotifications } from "reapop";

import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { GlobalStyle } from "~/theme/global-style";
import { theme, ThemeProvider } from "~/theme";
import { StyledWrapper, StyledContent } from "./styled";

interface TLayout {
  title: string;
}

const Layout: React.FC<TLayout> = ({ children, title }) => {
  const { notifications, dismissNotification } = useNotifications();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* Global site tag (gtag.js) - Google Analytics  */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CEW5H8WB6K"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){
                dataLayer.push(arguments)};
                gtag('js', new Date());
              
                gtag('config', 'G-CEW5H8WB6K');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '3473434059547685');
                fbq('track', 'PageView');
              `,
          }}
        ></script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3473434059547685&ev=PageView&noscript=1"
          />
        </noscript>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <StyledWrapper>
          <Header />
          <StyledContent>{children}</StyledContent>
          <Footer />
        </StyledWrapper>

        <NotificationsSystem
          dismissNotification={(id: string) => dismissNotification(id)}
          notifications={notifications}
        />
      </ThemeProvider>
    </>
  );
};

export { Layout };
