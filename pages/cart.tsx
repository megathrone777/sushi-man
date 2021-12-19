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
  TModalDay,
  setModalDay
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
  cutlery: {
    price: number;
  };
  days: TModalDay[];
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
  cutlery,
  days,
  hero,
  products,
  shopSettings,
  schedule,
}) => {
  const { dispatch } = useStore();
  const { t } = useTranslation();
  const cartTitle = t("cartTitle");
  const newAdditionals = additionals.map((additional: TAdditional) => {
    return {
      ...additional,
      quantity: 0,
    };
  });

  useEffect((): void => {
    dispatch(setAdditionals(newAdditionals));
    dispatch(setShopSettings(shopSettings));

    if (days && !!days.length) {
      dispatch(setModalDay(days[0]));
    } else {
      dispatch(setModalDay(null));
    }
  }, [additionals, cutlery.price, schedule, dispatch]);

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
  const {
    data: {
      additionals,
      days,
      hero_cs,
      hero_ru,
      products,
      cutlery,
      shop,
      schedule_cs,
      schedule_ru,
    },
  } = await client.query({
    query: gql`
      ${CartPageQuery}
    `,
  });

  return {
    additionals,
    days,
    products,
    hero: {
      hero_cs,
      hero_ru,
    },
    cutlery,
    shopSettings: shop,
    schedule: {
      schedule_cs,
      schedule_ru,
    },
  };
};

export default CartPage;
