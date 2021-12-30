import React, { useEffect } from "react";
import { NextPage } from "next";
import { gql } from "@apollo/client";

import client from "~/apollo-client";
import {
  TAdditional,
  TShopSettings,
  setAdditionals,
  setShopSettings,
  useStore,
  TSchedule,
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

import CartPageQuery from "~/queries/cartpage.gql";

interface TProps {
  additionals: TAdditional[];
  hero: {
    hero_cs: TBanner;
    hero_ru: TBanner;
  };
  products: TProduct[];
  shopSettings: TShopSettings;
  schedule: {
    schedule_cs: TSchedule;
    schedule_ru: TSchedule;
  };
}

const CartPage: NextPage<TProps> = ({
  additionals,
  hero,
  products,
  shopSettings,
}) => {
  const { dispatch } = useStore();
  const { t } = useTranslation();
  const cartTitle = t("cartTitle");
  const newAdditionals = additionals.map((additional: TAdditional) => ({
    ...additional,
    quantity: 0,
  }));

  useEffect((): void => {
    dispatch(setAdditionals(newAdditionals));
    dispatch(setShopSettings(shopSettings));
  }, [additionals, shopSettings]);

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

CartPage.getInitialProps = async () => {
  const date = new Date();
  const currentDay = date.getDay();
  const currentHours = date.getHours();
  const {
    data: {
      additionals,
      days,
      hero_cs,
      hero_ru,
      products,
      shop,
      schedule_cs,
      schedule_ru,
    },
  } = await client.query({
    query: gql`
      ${CartPageQuery}
    `,
    variables: {
      where: {
        dayOrder: currentDay,
      },
    },
  });

  const checkShopIsClosed = (): boolean => {
    const hoursFrom = days[0].timeFrom.split(":")[0];
    const hoursTo = days[0].timeTo.split(":")[0];

    return currentHours < hoursFrom || currentHours > hoursTo;
  };

  return {
    additionals,
    products,
    hero: {
      hero_cs,
      hero_ru,
    },
    shopSettings: {
      ...shop,
      shopIsClosed: checkShopIsClosed,
    },
    schedule: {
      schedule_cs,
      schedule_ru,
    },
  };
};

export default CartPage;
