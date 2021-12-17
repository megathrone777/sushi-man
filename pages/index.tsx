import React, { useEffect } from "react";
import { NextPage } from "next";
import { gql } from "@apollo/client";

import client from "~/apollo-client";
import {
  TAdditional,
  TSchedule,
  TShopSettings,
  setAdditionals,
  setShopSettings,
  useStore,
  setSchedule,
} from "~/store";
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

import HomePageQuery from "~/queries/homepage.gql";

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
  shopSettings: TShopSettings;
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
  shopSettings,
}) => {
  const { dispatch } = useStore();
  const { t } = useTranslation();
  const mainTitle = t("mainTitle");

  useEffect((): void => {
    dispatch(setAdditionals(additionals));
    dispatch(setShopSettings(shopSettings));
    dispatch(setSchedule(schedule));
  }, [additionals, schedule, dispatch]);

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
    data: {
      additionals,
      about_cs,
      about_ru,
      banner_ru,
      banner_cs,
      days,
      deliveryTitle_cs,
      deliveryTitle_ru,
      deliveryItems,
      hero_cs,
      hero_ru,
      products,
      reviews,
      schedule_cs,
      schedule_ru,
      shop,
    },
  } = await client.query({
    query: gql`
      ${HomePageQuery}
    `,
  });

  return {
    additionals,
    about: {
      about_cs,
      about_ru,
    },
    banner: {
      banner_cs,
      banner_ru,
    },
    days,
    delivery: {
      deliveryTitle: {
        deliveryTitle_cs,
        deliveryTitle_ru,
      },
      deliveryItems,
    },
    hero: {
      hero_cs,
      hero_ru,
    },
    products,
    reviews,
    schedule: {
      schedule_cs,
      schedule_ru,
    },
    shopSettings: shop,
  };
};

export default IndexPage;
