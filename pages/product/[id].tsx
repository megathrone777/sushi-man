import React from "react";
import { NextPage } from "next";
import { gql } from "@apollo/client";

import client from "~/apollo-client";
import {
  Banner,
  Layout,
  TBanner,
  ProductDetails,
  TProduct,
  ProductsRecommended,
} from "~/components";
import HeroQuery from "~/queries/hero.graphql";
import ProductsQuery from "~/queries/products.graphql";

interface TProps {
  product: TProduct;
  products: TProduct[];
  hero: {
    hero_cs: TBanner;
    hero_ru: TBanner;
  };
}

const ProductPage: NextPage<TProps> = ({ hero, product, products }) => (
  <Layout inner title="Product">
    <Banner
      hero={{
        hero_cs: hero["hero_cs"],
        hero_ru: hero["hero_ru"],
      }}
      inner
    />
    <ProductDetails {...product} />
    <ProductsRecommended products={products} />
  </Layout>
);

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
          title
          slug
          weight
        }
      }
    `,
  });

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

  return {
    ...product,
    hero,
    products,
  };
};

export default ProductPage;
