import React, { useEffect } from "react";
import { NextPage } from "next";
import { gql } from "@apollo/client";
import fetch from "isomorphic-unfetch";

import client from "~/apollo-client";
import {
  TAdditional,
  setAdditionals,
  setCutleryPrice,
  setLengthInKm,
  useStore,
} from "~/store";
import useTranslation from "~/intl/useTranslation";
import {
  Banner,
  Cart,
  Layout,
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
}

const CartPage: NextPage<TProps> = ({
  additionals,
  cutlery,
  hero,
  products,
  lengthInKm,
}) => {
  const { dispatch } = useStore();
  const { t } = useTranslation();
  const cartTitle = t("cartTitle");

  useEffect((): void => {
    dispatch(setLengthInKm(lengthInKm));
    dispatch(setCutleryPrice(cutlery.price));
    dispatch(setAdditionals(additionals));
  }, [additionals, cutlery.price, dispatch, lengthInKm]);

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

export const getServerSideProps = async ({ query }) => {
  const origins = "50.086610,14.448785";
  const key = "AIzaSyAelVTTeDWjXmX7yF_m83ebT7GbJZsNaUY";
  const { destinations } = query;

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${
      destinations || ""
    }&key=${key}`,
    { mode: "no-cors" }
  );
  const data = await response.json();
  const lengthInKm = data.rows.length && data.rows[0].elements[0].distance.text;

  const {
    data: { additionals, hero_cs, hero_ru, products, cutlery },
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
      lengthInKm,
    },
  };
};

export default CartPage;
