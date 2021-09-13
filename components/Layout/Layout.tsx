import React from "react";
import Head from "next/head";
import NotificationsSystem, { useNotifications } from "reapop";

import useTranslation from "~/intl/useTranslation";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { GlobalStyle } from "~/theme/global-style";
import { theme, ThemeProvider } from "~/theme";
import { StyledWrapper, StyledContent } from "./styled";

interface TLayout {
  inner?: boolean;
  title: string;
}

const Layout: React.FC<TLayout> = ({ children, title, inner }) => {
  const { notifications, dismissNotification } = useNotifications();
  const { t } = useTranslation();
  const metaDescription = t("metaDescription");
  const mainMenu = t("mainMenu");
  const innerMenu = t("innerMenu");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sushi-man.cz" />
        <meta property="og:title" content="Sushi man | Rozvoz sushi po Praze" />
        <meta
          property="og:image"
          content="https://sushi-man.cz/images/logo_img.png"
        />
        <meta name="yandex-verification" content="2d640540016895e1" />
      </Head>

      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <StyledWrapper>
          <Header
            inner={inner}
            mainMenuItems={mainMenu}
            innerMenuItems={innerMenu}
          />
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
