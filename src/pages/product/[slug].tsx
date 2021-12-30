import React, { useEffect } from "react";
import { NextPage } from "next";
import { gql } from "@apollo/client";

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
  ProductsRecommended,
} from "~/components";

import ProductPageQuery from "~/queries/productpage.gql";

interface TProps {
  modalDay: TModalDay;
  productDetails: TProduct;
  products: TProduct[];
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
  products,
  shopSettings,
}) => {
  const { dispatch } = useStore();

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
      <ProductsRecommended products={products} />
    </LayoutSecondary>
  );
};

ProductPage.getInitialProps = async ({ query: { slug } }) => {
  const date = new Date();
  const currentDay = date.getDay();
  const { data } = await client.query({
    query: gql`
      query ProductsQuery {
        products(where: { slug: "${slug}"}) {
          allergeny
          id
          image {
            url
          }
          ingredients
          isDrink
          isPoke
          isRoll
          isSalat
          isSet
          price
          product_modifiers {
            price
            name
            id
            submodifiers {
              id
              name
            }
          }
          slug
          title
          weight
        }
      }
    `,
  });

  const {
    data: { days, modalDay, products, hero_cs, hero_ru, shop },
  } = await client.query({
    query: gql`
      ${ProductPageQuery}
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
    const from = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Prague" })
    );
    from.setHours(parseInt(fromHours[0]));
    from.setMinutes(parseInt(fromHours[1]));

    const toHours = toString.split(":");
    const to = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Prague" })
    );
    to.setHours(parseInt(toHours[0]));
    to.setMinutes(parseInt(toHours[1]));

    const now = new Date();

    return now < from || now > to;
  };

  return {
    hero: {
      hero_cs,
      hero_ru,
    },
    modalDay,
    productDetails: data["products"][0],
    products,
    shopSettings: {
      ...shop,
      shopIsClosed: checkShopIsClosed(),
    },
  };
};

export default ProductPage;
