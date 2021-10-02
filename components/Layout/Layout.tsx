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
        <meta name="format-detection" content="telephone=no" />
        <meta name="description" content={metaDescription} />
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
          <Footer
            inner={inner}
            mainMenuItems={mainMenu}
            innerMenuItems={innerMenu}
          />
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
