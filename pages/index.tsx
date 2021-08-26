import React from "react";
import fetch from "isomorphic-unfetch";
import { NextPage } from "next";

import { TProduct, TSchedule } from "~/store";
import useTranslation from "~/intl/useTranslation";
import {
  About,
  Banner,
  Contacts,
  Delivery,
  Layout,
  Products,
  Reviews,
  TReview,
  TAbout,
  TDelivery,
  TBanner,
} from "~/components";

interface TProps {
  about: TAbout[];
  delivery: TDelivery;
  hero: TBanner[];
  productsList: TProduct[];
  reviewsList: TReview[];
  schedule: TSchedule[];
}

const IndexPage: NextPage<TProps> = ({
  about,
  delivery,
  hero,
  productsList,
  reviewsList,
  schedule,
}) => {
  const { t } = useTranslation();
  const mainTitle = t("mainTitle");

  return (
    <Layout title={mainTitle}>
      <Banner hero={hero} />
      <About about={about} />
      <Contacts schedule={schedule} />
      <Products productsList={productsList} />
      <Delivery
        deliveryTitle={delivery.deliveryTitle}
        deliveryItems={delivery.deliveryItems}
      />
      <Reviews reviewsList={reviewsList} />
    </Layout>
  );
};

IndexPage.getInitialProps = async () => {
  const products = await fetch(
    "https://sushi-admin.herokuapp.com/products?_sort=published_at:ASC"
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

  return {
    about,
    delivery: {
      deliveryTitle,
      deliveryItems,
    },
    hero,
    productsList,
    reviewsList,
    schedule,
  };
};

export default IndexPage;
