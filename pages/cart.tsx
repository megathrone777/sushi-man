import React, { useContext, useEffect } from "react";

import { TAdditional, AppContext, setAdditionals } from "~/store";
import useTranslation from "~/intl/useTranslation";
import { Banner, Cart, Layout } from "~/components";

interface TProps {
  additionals: TAdditional[];
}

const CartPage: React.FC<TProps> = ({ additionals }) => {
  const { dispatch } = useContext(AppContext);
  const { t } = useTranslation();
  const cartTitle = t("cartTitle");

  useEffect((): void => {
    dispatch(setAdditionals(additionals));
  }, [additionals]);

  return (
    <Layout title={cartTitle}>
      <Banner hero={[]} inner />
      <Cart />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    "https://sushi-admin.herokuapp.com/additionals?_sort=published_at:ASC"
  );
  const additionals = await response.json();

  return {
    props: { additionals, revalidate: 10 },
  };
};

export default CartPage;
