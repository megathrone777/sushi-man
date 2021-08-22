import React from "react";
import fetch from "isomorphic-unfetch";

import { TProduct } from "~/store";
import { TReview } from "~/components/Reviews";
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
  productsList: TProduct[];
  reviewsList: TReview[];
}

const IndexPage: React.FC<TProps> = ({ productsList, reviewsList }) => {
  const { t } = useTranslation();
  const mainTitle = t("mainTitle");

  return (
    <Layout title={mainTitle}>
      <Banner />
      <About />
      <Contacts />
      <Products productsList={productsList} />
      <Delivery />
      <Reviews reviewsList={reviewsList} />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const products = await fetch(
    "https://sushi-admin.herokuapp.com/products?_sort=published_at:ASC"
  );
  const reviews = await fetch("https://sushi-admin.herokuapp.com/reviews");
  const productsList = await products.json();
  const reviewsList = await reviews.json();

  return {
    props: { productsList, reviewsList, revalidate: 10 },
  };
};

export default IndexPage;
