import React from "react";
import fetch from "isomorphic-unfetch";
import { NextPage } from "next";

import { TProduct } from "~/store";
import { TReview } from "~/components/Reviews";
import { TAbout } from "~/components/About";
import useTranslation from "~/intl/useTranslation";
import {
  About,
  Banner,
  Contacts,
  Delivery,
  Layout,
  Products,
  Reviews,
} from "~/components";

interface TProps {
  about: TAbout[];
  productsList: TProduct[];
  reviewsList: TReview[];
}

const IndexPage: NextPage<TProps> = ({ about, productsList, reviewsList }) => {
  const { t } = useTranslation();
  const mainTitle = t("mainTitle");

  return (
    <Layout title={mainTitle}>
      <Banner />
      <About about={about} />
      <Contacts />
      <Products productsList={productsList} />
      <Delivery />
      <Reviews reviewsList={reviewsList} />
    </Layout>
  );
};

IndexPage.getInitialProps = async () => {
  const products = await fetch(
    "https://sushi-admin.herokuapp.com/products?_sort=published_at:ASC"
  );
  const reviews = await fetch("https://sushi-admin.herokuapp.com/reviews");
  const productsList = await products.json();
  const reviewsList = await reviews.json();

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

  return {
    about,
    productsList,
    reviewsList,
  };
};

export default IndexPage;
