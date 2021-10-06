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

import ProductPageQuery from "~/queries/productpage.graphql";

interface TProps {
  product: TProduct;
  products: TProduct[];
  hero: {
    hero_cs: TBanner;
    hero_ru: TBanner;
  };
  shopSettings: TShopSettings;
}

const ProductPage: NextPage<TProps> = ({
  hero,
  product,
  products,
  shopSettings,
}) => {
  const { dispatch } = useStore();

  useEffect((): void => {
    dispatch(setShopSettings(shopSettings));
  }, [dispatch]);

  return (
    <LayoutSecondary title="Product">
      <Banner
        hero={{
          hero_cs: hero["hero_cs"],
          hero_ru: hero["hero_ru"],
        }}
        inner
      />
      <ProductDetails {...product} />
      <ProductsRecommended products={products} />
    </LayoutSecondary>
  );
};

ProductPage.getInitialProps = async ({ query: { id } }) => {
  const { data: product } = await client.query({
    query: gql`
      query ProductQuery {
        product(id: ${id}) {
          allergeny
          ingredients
          price
          weight
          id
          image {
            url
          }
          product_modifiers {
            price
            name
            id
            submodifiers {
              id
              name
            }
          }
          isRoll
          persons
          title
          slug
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
    ...product,
    hero: {
      hero_cs,
      hero_ru,
    },
    products,
    shopSettings: shop,
  };
};

export default ProductPage;
