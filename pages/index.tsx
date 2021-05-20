import React from "react";
import fetch from "isomorphic-unfetch";

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
} from "~/components";

interface TProps {
  productsList: TProduct[];
}

const IndexPage = ({ productsList }: TProps) => {
  const { t } = useTranslation();
  const mainTitle = t("mainTitle");

  return (
    <Layout title={mainTitle}>
      <Banner />
      <About />
      <Contacts />
      <Products productsList={productsList} />
      <Delivery />
      <Reviews />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    "https://sushi-admin.herokuapp.com/products?_sort=published_at:ASC"
  );
  const productsList = await response.json();

  return {
    props: { productsList, revalidate: 10 },
  };
};

export default IndexPage;
