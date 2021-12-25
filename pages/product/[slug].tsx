import React, { useEffect } from "react";
import { NextPage } from "next";
import { gql } from "@apollo/client";

import client from "~/apollo-client";
import { TShopSettings, setShopSettings, useStore } from "~/store";
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
  productDetails,
  products,
  shopSettings,
}) => {
  const { dispatch } = useStore();

  useEffect((): void => {
    dispatch(setShopSettings(shopSettings));
  }, [shopSettings]);

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
  const { data } = await client.query({
    query: gql`
      query ProductsQuery {
        products(where: { slug: "${slug}" }) {
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
    data: { products, hero_cs, hero_ru, shop },
  } = await client.query({
    query: gql`
      ${ProductPageQuery}
    `,
  });

  return {
    hero: {
      hero_cs,
      hero_ru,
    },
    productDetails: data["products"][0],
    products,
    shopSettings: shop,
  };
};

export default ProductPage;
