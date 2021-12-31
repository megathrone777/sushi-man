import React, { useEffect } from "react";
import { NextPage } from "next";
import { gql } from "@apollo/client";

import client from "~/apollo-client";
import {
  TSchedule,
  TShopSettings,
  setShopSettings,
  useStore,
  setSchedule,
  TModalDay,
  setModalDay,
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
  TDelivery,
  TReview,
  TAbout,
  TBanner,
  TMedia,
  TProduct,
} from "~/components";

import HomePageQuery from "~/queries/homepage.gql";

interface TProps {
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
  modalDay: TModalDay;
  products: TProduct[];
  reviews: TReview[];
  schedule: {
    schedule_cs: TSchedule;
    schedule_ru: TSchedule;
  };
  shopSettings: TShopSettings;
}

const IndexPage: NextPage<TProps> = ({
  about,
  banner,
  delivery,
  hero,
  modalDay,
  products,
  reviews,
  schedule,
  shopSettings,
}) => {
  const { dispatch } = useStore();
  const { t } = useTranslation();
  const mainTitle = t("mainTitle");

  useEffect((): void => {
    dispatch(setShopSettings(shopSettings));
    dispatch(setSchedule(schedule));
    dispatch(setModalDay(modalDay));
  }, [shopSettings, schedule, modalDay]);

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
  const date = new Date();
  const currentDay = date.getDay();
  const {
    data: {
      about_cs,
      about_ru,
      banner_cs,
      banner_ru,
      days,
      deliveryItems,
      deliveryTitle_cs,
      deliveryTitle_ru,
      hero_cs,
      hero_ru,
      modalDay,
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
    about: {
      about_cs,
      about_ru,
    },
    banner: {
      banner_cs,
      banner_ru,
    },
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
    modalDay,
    products,
    reviews,
    schedule: {
      schedule_cs,
      schedule_ru,
    },
    shopSettings: {
      ...shop,
      shopIsClosed: checkShopIsClosed(),
    },
  };
};

export default IndexPage;
