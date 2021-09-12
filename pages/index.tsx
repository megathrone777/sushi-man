import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import { NextPage } from "next";

import { TProduct, TSchedule } from "~/store";
import useTranslation from "~/intl/useTranslation";
import {
  About,
  Banner,
  Contacts,
  Delivery,
  Info,
  Layout,
  Media,
  Products,
  Reviews,
  TReview,
  TAbout,
  TDelivery,
  TInfo,
  TBanner,
  TMedia,
} from "~/components";

interface TProps {
  about: TAbout[];
  banner: TMedia[];
  delivery: TDelivery;
  hero: TBanner[];
  info: TInfo[];
  productsList: TProduct[];
  reviewsList: TReview[];
  schedule: TSchedule[];
}

const IndexPage: NextPage<TProps> = ({
  about,
  banner,
  delivery,
  hero,
  info,
  productsList,
  reviewsList,
  schedule,
}) => {
  const { t } = useTranslation();
  const mainTitle = t("mainTitle");
  const [infoIsOpened, toggleInfoOpened] = useState<boolean>(info[0].isActive);

  const handleInfoClose = (): void => {
    toggleInfoOpened(false);
  };

  return (
    <Layout title={mainTitle}>
      <Banner hero={hero} />
      <Media banner={banner} />
      <About about={about} />
      <Contacts schedule={schedule} />
      <Products productsList={productsList} />
      <Delivery
        deliveryTitle={delivery.deliveryTitle}
        deliveryItems={delivery.deliveryItems}
      />
      <Reviews reviewsList={reviewsList} />
      <Info
        close={handleInfoClose}
        isOpened={infoIsOpened}
        modalContent={info}
      />
    </Layout>
  );
};

IndexPage.getInitialProps = async () => {
  const products = await fetch(
    "https://sushi-admin.herokuapp.com/products?_sort=priority:ASC"
  );
  const reviews = await fetch("https://sushi-admin.herokuapp.com/reviews");
  const delivery = await fetch(
    "https://sushi-admin.herokuapp.com/delivery-items?_locale=all"
  );
  const productsList = await products.json();
  const reviewsList = await reviews.json();
  const deliveryItems = await delivery.json();
  const about = await Promise.all([
    fetch("https://sushi-admin.herokuapp.com/about?_locale=cs"),
    fetch("https://sushi-admin.herokuapp.com/about?_locale=ru"),
  ])
    .then(async ([cz, ru]) => {
      const aboutCZ = await cz.json();
      const aboutRU = await ru.json();

      return [aboutCZ, aboutRU];
    })
    .then((responseText) => responseText);
  const deliveryTitle = await Promise.all([
    fetch("https://sushi-admin.herokuapp.com/delivery-title?_locale=cs"),
    fetch("https://sushi-admin.herokuapp.com/delivery-title?_locale=ru"),
  ])
    .then(async ([cz, ru]) => {
      const deliveryCZ = await cz.json();
      const deliveryRU = await ru.json();

      return [deliveryCZ, deliveryRU];
    })
    .then((responseText) => responseText);
  const schedule = await Promise.all([
    fetch("https://sushi-admin.herokuapp.com/schedule?_locale=cs"),
    fetch("https://sushi-admin.herokuapp.com/schedule?_locale=ru"),
  ])
    .then(async ([cz, ru]) => {
      const scheuleCZ = await cz.json();
      const scheuleRU = await ru.json();

      return [scheuleCZ, scheuleRU];
    })
    .then((responseText) => responseText);
  const hero = await Promise.all([
    fetch("https://sushi-admin.herokuapp.com/hero?_locale=cs"),
    fetch("https://sushi-admin.herokuapp.com/hero?_locale=ru"),
  ])
    .then(async ([cz, ru]) => {
      const heroCZ = await cz.json();
      const heroRU = await ru.json();

      return [heroCZ, heroRU];
    })
    .then((responseText) => responseText);
  const banner = await Promise.all([
    fetch("https://sushi-admin.herokuapp.com/banner?_locale=cs"),
    fetch("https://sushi-admin.herokuapp.com/banner?_locale=ru"),
  ])
    .then(async ([cz, ru]) => {
      const bannerCZ = await cz.json();
      const bannerRU = await ru.json();

      return [bannerCZ, bannerRU];
    })
    .then((responseText) => responseText);
  const info = await Promise.all([
    fetch("https://sushi-admin.herokuapp.com/modal?_locale=cs"),
    fetch("https://sushi-admin.herokuapp.com/modal?_locale=ru"),
  ])
    .then(async ([cz, ru]) => {
      const infoCZ = await cz.json();
      const infoRU = await ru.json();

      return [infoCZ, infoRU];
    })
    .then((responseText) => responseText);

  return {
    about,
    banner,
    delivery: {
      deliveryTitle,
      deliveryItems,
    },
    hero,
    info,
    productsList,
    reviewsList,
    schedule,
  };
};

export default IndexPage;
