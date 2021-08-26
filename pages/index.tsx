import React from "react";
import fetch from "isomorphic-unfetch";
import { NextPage } from "next";

import { TProduct } from "~/store";
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
} from "~/components";

interface TProps {
  about: TAbout[];
  delivery: TDelivery;
  productsList: TProduct[];
  reviewsList: TReview[];
}

const IndexPage: NextPage<TProps> = ({
  about,
  delivery,
  productsList,
  reviewsList,
}) => {
  const { t } = useTranslation();
  const mainTitle = t("mainTitle");

  return (
    <Layout title={mainTitle}>
      <Banner />
      <About about={about} />
      <Contacts />
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

  return {
    about,
    delivery: {
      deliveryTitle,
      deliveryItems,
    },
    productsList,
    reviewsList,
  };
};

export default IndexPage;
