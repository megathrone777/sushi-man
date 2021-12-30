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
  setModalDay,
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
  modalDay: TModalDay;
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
  modalDay,
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
    dispatch(setModalDay(modalDay));
  }, [additionals, shopSettings, modalDay]);

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
  const {
    data: {
      additionals,
      days,
      hero_cs,
      hero_ru,
      modalDay,
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
    const fromString = days[0].timeFrom;
    const toString = days[0].timeTo;

    const fromHours = fromString.split(":");
    const from = new Date();
    from.setHours(parseInt(fromHours[0]));
    from.setMinutes(parseInt(fromHours[1]));

    const toHours = toString.split(":");
    const to = new Date();
    to.setHours(parseInt(toHours[0]));
    to.setMinutes(parseInt(toHours[1]));

    const now = new Date();

    return now <= from || now >= to;
  };

  return {
    additionals,
    modalDay,
    products,
    hero: {
      hero_cs,
      hero_ru,
    },
    shopSettings: {
      ...shop,
      shopIsClosed: checkShopIsClosed(),
    },
    schedule: {
      schedule_cs,
      schedule_ru,
    },
  };
};

export default CartPage;
