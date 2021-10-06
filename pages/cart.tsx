import React, { useEffect } from "react";
import { NextPage } from "next";
import { gql } from "@apollo/client";

import client from "~/apollo-client";
import {
  TAdditional,
  TShopSettings,
  setAdditionals,
  setCutleryPrice,
  setShopSettings,
  useStore,
} from "~/store";
import useTranslation from "~/intl/useTranslation";
import {
  Banner,
  Cart,
  LayoutSecondary,
  TBanner,
  TProduct,
  ProductsRecommended,
} from "~/components";

import CartPageQuery from "~/queries/cartpage.graphql";

interface TProps {
  additionals: TAdditional[];
  cutlery: {
    price: number;
  };
  hero: {
    hero_cs: TBanner;
    hero_ru: TBanner;
  };
  products: TProduct[];
  lengthInKm: string;
  shopSettings: TShopSettings;
}

const CartPage: NextPage<TProps> = ({
  additionals,
  cutlery,
  hero,
  products,
  shopSettings,
}) => {
  const { dispatch } = useStore();
  const { t } = useTranslation();
  const cartTitle = t("cartTitle");

  useEffect((): void => {
    dispatch(setCutleryPrice(cutlery.price));
    dispatch(setAdditionals(additionals));
    dispatch(setShopSettings(shopSettings));
  }, [additionals, cutlery.price, dispatch]);

  return (
    <LayoutSecondary title={cartTitle}>
      <Banner
        hero={{
          hero_cs: hero["hero_cs"],
          hero_ru: hero["hero_ru"],
        }}
        inner
      />
      <Cart />
      <ProductsRecommended products={products} />
    </LayoutSecondary>
  );
};

export const getServerSideProps = async () => {
  const {
    data: { additionals, hero_cs, hero_ru, products, cutlery, shop },
  } = await client.query({
    query: gql`
      ${CartPageQuery}
    `,
  });

  return {
    props: {
      additionals,
      products,
      hero: {
        hero_cs,
        hero_ru,
      },
      cutlery,
      shopSettings: shop,
    },
  };
};

export default CartPage;
