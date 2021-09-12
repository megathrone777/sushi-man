import React, { useContext, useEffect } from "react";
import { NextPage } from "next";
import { gql } from "@apollo/client";

import client from "~/apollo-client";
import { TAdditional, AppContext, setAdditionals } from "~/store";
import useTranslation from "~/intl/useTranslation";
import {
  Banner,
  Cart,
  Layout,
  TBanner,
  TProduct,
  ProductsRecommended,
} from "~/components";
import HeroQuery from "~/queries/hero.graphql";
import ProductsQuery from "~/queries/products.graphql";
import AdditionalsQuery from "~/queries/additionals.graphql";

interface TProps {
  additionals: TAdditional[];
  hero: {
    hero_cs: TBanner;
    hero_ru: TBanner;
  };
  products: TProduct[];
}

const CartPage: NextPage<TProps> = ({ additionals, hero, products }) => {
  const { dispatch } = useContext(AppContext);
  const { t } = useTranslation();
  const cartTitle = t("cartTitle");

  useEffect((): void => {
    dispatch(setAdditionals(additionals));
  }, [additionals]);

  return (
    <Layout inner title={cartTitle}>
      <Banner
        hero={{
          hero_cs: hero["hero_cs"],
          hero_ru: hero["hero_ru"],
        }}
        inner
      />
      <Cart />
      <ProductsRecommended products={products} />
    </Layout>
  );
};

CartPage.getInitialProps = async () => {
  const { data: hero } = await client.query({
    query: gql`
      ${HeroQuery}
    `,
  });

  const {
    data: { products },
  } = await client.query({
    query: gql`
      ${ProductsQuery}
    `,
  });

  const {
    data: { additionals },
  } = await client.query({
    query: gql`
      ${AdditionalsQuery}
    `,
  });

  return {
    additionals,
    products,
    hero,
  };
};

export default CartPage;
