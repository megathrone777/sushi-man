import React, { useEffect } from "react";
import { NextPage } from "next";
import { gql } from "@apollo/client";

import { useStore, setShopSettings, TShopSettings } from "~/store";
import { Settings } from "~/components";
import client from "~/apollo-client";
import { ThemeProvider, theme } from "~/theme";

import SettingsPageQuery from "~/queries/settingspage.gql";

interface TProps {
  shopSettings: TShopSettings;
}

const SettingsPage: NextPage<TProps> = ({ shopSettings }) => {
  const { dispatch } = useStore();

  useEffect((): void => {
    dispatch(setShopSettings(shopSettings));
    console.log(shopSettings, 'set');
  }, [shopSettings]);

  return (
    <ThemeProvider theme={theme}>
      <Settings />
    </ThemeProvider>
  );
};

SettingsPage.getInitialProps = async () => {
  const {
    data: { shop },
  } = await client.query({
    query: gql`
      ${SettingsPageQuery}
    `,
  });

  return {
    shopSettings: shop,
  };
};

export default SettingsPage;
