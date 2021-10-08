import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { gql } from "@apollo/client";

import client from "~/apollo-client";
import { TBanner, Banner, LayoutSecondary } from "~/components";
import { StyledContainer } from "~/components/Layout/styled";

import OrderConfirmedPageQuery from "~/queries/rulespage.gql";

interface TProps {
  hero: {
    hero_cs: TBanner;
    hero_ru: TBanner;
  };
}

const OrderConfirmedPage: NextPage<TProps> = ({ hero }) => (
  <LayoutSecondary title="Order Confirmed">
    <Banner
      hero={{
        hero_cs: hero["hero_cs"],
        hero_ru: hero["hero_ru"],
      }}
      inner
    />
    <StyledContainer>
      Order Confirmed<Link href="/">Main page</Link>
    </StyledContainer>
  </LayoutSecondary>
);

OrderConfirmedPage.getInitialProps = async () => {
  const {
    data: { hero_cs, hero_ru },
  } = await client.query({
    query: gql`
      ${OrderConfirmedPageQuery}
    `,
  });

  return {
    hero: {
      hero_cs,
      hero_ru,
    },
  };
};

export default OrderConfirmedPage;
