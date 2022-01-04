import React, { useEffect } from "react";
import { NextPage } from "next";
import { gql } from "@apollo/client";
import { isBefore, isAfter } from "date-fns";

import useTranslation from "~/intl/useTranslation";
import client from "~/apollo-client";
import {
  TShopSettings,
  setShopSettings,
  useStore,
  TModalDay,
  setModalDay,
} from "~/store";
import {
  Banner,
  LayoutSecondary,
  TBanner,
  ProductDetails,
  TProduct,
  Products,
} from "~/components";

import ProductPageQuery from "~/queries/productpage.gql";

interface TProps {
  modalDay: TModalDay;
  productDetails: TProduct;
  hero: {
    hero_cs: TBanner;
    hero_ru: TBanner;
  };
  shopSettings: TShopSettings;
}

const ProductPage: NextPage<TProps> = ({
  hero,
  modalDay,
  productDetails,
  shopSettings,
}) => {
  const { dispatch } = useStore();
  const { t } = useTranslation();
  const productsTitle = t("recommendedTitle");

  useEffect((): void => {
    dispatch(setShopSettings(shopSettings));
    dispatch(setModalDay(modalDay));
  }, [shopSettings, modalDay]);

  return (
    <LayoutSecondary title={`${productDetails.title} | Rozvoz sushi po Praze`}>
      <Banner
        hero={{
          hero_cs: hero["hero_cs"],
          hero_ru: hero["hero_ru"],
        }}
        inner
      />
      <ProductDetails {...productDetails} />
      <Products inner title={productsTitle} />
    </LayoutSecondary>
  );
};

ProductPage.getInitialProps = async ({ query: { slug } }) => {
  const date = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Prague" })
  );
  const currentDay = date.getDay();

  const {
    data: { days, modalDay, hero_cs, hero_ru, shop, products },
  } = await client.query({
    query: gql`
      ${ProductPageQuery}
    `,
    variables: {
      productsWhere: {
        slug,
      },
      daysWhere: {
        dayOrder: currentDay,
      },
    },
  });

  const checkShopIsClosed = (): boolean => {
    const hoursFrom = days[0].timeFrom.split(":")[0];
    const hoursTo = days[0].timeTo.split(":")[0];
    const minutesFrom = days[0].timeFrom.split(":")[1];
    const minutesTo = days[0].timeTo.split(":")[1];
    const timeFrom = new Date(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hoursFrom,
        minutesFrom,
        0
      ).toLocaleString("en-US", { timeZone: "Europe/Prague" })
    );
    const timeTo = new Date(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hoursTo,
        minutesTo,
        0
      ).toLocaleString("en-US", { timeZone: "Europe/Prague" })
    );

    const compareResultFrom: boolean = isBefore(
      new Date(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          0
        ).toLocaleString("en-US", { timeZone: "Europe/Prague" })
      ),
      timeFrom
    );
    const compareResultAfter: boolean = isAfter(
      new Date(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          0
        ).toLocaleString("en-US", { timeZone: "Europe/Prague" })
      ),
      timeTo
    );

    return compareResultFrom || compareResultAfter;
  };

  return {
    hero: {
      hero_cs,
      hero_ru,
    },
    modalDay,
    productDetails: products[0],
    shopSettings: {
      ...shop,
      shopIsClosed: checkShopIsClosed(),
    },
  };
};

export default ProductPage;
