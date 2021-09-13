import React, { useContext, useEffect } from "react";
import { NextPage } from "next";
import { gql } from "@apollo/client";

import client from "~/apollo-client";
import { AppContext, TAdditional, setAdditionals } from "~/store";
import { TSchedule } from "~/store";
import useTranslation from "~/intl/useTranslation";
import {
  About,
  Banner,
  Contacts,
  Delivery,
  Layout,
  Media,
  Products,
  Reviews,
  TReview,
  TAbout,
  TDelivery,
  TBanner,
  TMedia,
  TProduct,
} from "~/components";

import ProductsQuery from "~/queries/products.graphql";
import ReviewsQuery from "~/queries/reviews.graphql";
import DeliveryQuery from "~/queries/delivery.graphql";
import AboutQuery from "~/queries/about.graphql";
import DeliveryTitleQuery from "~/queries/delivery-title.graphql";
import ScheduleQuery from "~/queries/schedule.graphql";
import HeroQuery from "~/queries/hero.graphql";
import BannerQuery from "~/queries/banner.graphql";
import AdditionalsQuery from "~/queries/additionals.graphql";

interface TProps {
  additionals: TAdditional[];
  about: {
    about_cs: TAbout;
    about_ru: TAbout;
  };
  banner: {
    banner_cs: TMedia;
    banner_ru: TMedia;
  };
  delivery: TDelivery;
  hero: {
    hero_cs: TBanner;
    hero_ru: TBanner;
  };
  products: TProduct[];
  reviews: TReview[];
  schedule: {
    schedule_cs: TSchedule;
    schedule_ru: TSchedule;
  };
}

const IndexPage: NextPage<TProps> = ({
  additionals,
  about,
  banner,
  delivery,
  hero,
  products,
  reviews,
  schedule,
}) => {
  const { dispatch } = useContext(AppContext);
  const { t } = useTranslation();
  const mainTitle = t("mainTitle");

  useEffect((): void => {
    dispatch(setAdditionals(additionals));
  }, []);

  return (
    <Layout title={mainTitle}>
      <Banner
        hero={{
          hero_cs: hero["hero_cs"],
          hero_ru: hero["hero_ru"],
        }}
      />
      <Media
        banner={{
          banner_cs: banner["banner_cs"],
          banner_ru: banner["banner_ru"],
        }}
      />
      <About
        about={{
          about_cs: about["about_cs"],
          about_ru: about["about_ru"],
        }}
      />
      <Contacts
        schedule={{
          schedule_cs: schedule["schedule_cs"],
          schedule_ru: schedule["schedule_ru"],
        }}
      />
      <Products products={products} />
      <Delivery
        deliveryTitle={{
          deliveryTitle_cs: delivery.deliveryTitle["deliveryTitle_cs"],
          deliveryTitle_ru: delivery.deliveryTitle["deliveryTitle_ru"],
        }}
        deliveryItems={delivery.deliveryItems}
      />
      <Reviews reviews={reviews} />
    </Layout>
  );
};

IndexPage.getInitialProps = async () => {
  const {
    data: { products },
  } = await client.query({
    query: gql`
      ${ProductsQuery}
    `,
  });

  const {
    data: { additionals },
  } = await client.query({
    query: gql`
      ${AdditionalsQuery}
    `,
  });

  const {
    data: { reviews },
  } = await client.query({
    query: gql`
      ${ReviewsQuery}
    `,
  });

  const {
    data: { deliveryItems },
  } = await client.query({
    query: gql`
      ${DeliveryQuery}
    `,
  });

  const { data: about } = await client.query({
    query: gql`
      ${AboutQuery}
    `,
  });

  const { data: deliveryTitle } = await client.query({
    query: gql`
      ${DeliveryTitleQuery}
    `,
  });

  const { data: schedule } = await client.query({
    query: gql`
      ${ScheduleQuery}
    `,
  });

  const { data: hero } = await client.query({
    query: gql`
      ${HeroQuery}
    `,
  });

  const { data: banner } = await client.query({
    query: gql`
      ${BannerQuery}
    `,
  });

  return {
    additionals,
    about,
    banner,
    delivery: {
      deliveryTitle,
      deliveryItems,
    },
    hero,
    products,
    reviews,
    schedule,
  };
};

export default IndexPage;
