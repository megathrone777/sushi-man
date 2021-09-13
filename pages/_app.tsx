import React from "react";
import Script from "next/script";

import { AppProps } from "next/app";
import { NotificationsProvider } from "reapop";

import { AppProvider } from "~/store";
import { LanguageProvider } from "../intl/LanguageProvider";

const App = ({ Component, pageProps, router }: AppProps) => (
  <>
    {/* Global site tag (gtag.js) - Google Analytics  */}
    <Script
      strategy="lazyOnload"
      src="https://www.googletagmanager.com/gtag/js?id=G-CEW5H8WB6K"
    />
    <Script strategy="lazyOnload" id="google">
      {`
        window.dataLayer = window.dataLayer || [];
            function gtag(){
              dataLayer.push(arguments)
            };
            gtag('js', new Date());
            
            gtag('config', 'G-CEW5H8WB6K');    
      `}
    </Script>

    <Script strategy="lazyOnload" id="facebook">
      {`
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
        `}
    </Script>
    
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src="https://www.facebook.com/tr?id=3473434059547685&ev=PageView&noscript=1"
      />
    </noscript>

    <Script
      dangerouslySetInnerHTML={{
        __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
   ym(78947092, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });`,
      }}
      id="yandex"
    />
    <noscript>
      <div>
        <img
          alt=""
          src="https://mc.yandex.ru/watch/78947092"
          style={{ position: "absolute", left: "-9999px" }}
        />
      </div>
    </noscript>
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
  </>
);

export default App;
