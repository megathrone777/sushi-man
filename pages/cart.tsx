import React, { useContext, useEffect } from "react";
import { NextPage } from "next";

import { TAdditional, AppContext, setAdditionals } from "~/store";
import useTranslation from "~/intl/useTranslation";
import { Banner, Cart, Layout, TBanner } from "~/components";

interface TProps {
  additionals: TAdditional[];
  hero: TBanner[];
}

const CartPage: NextPage<TProps> = ({ additionals, hero }) => {
  const { dispatch } = useContext(AppContext);
  const { t } = useTranslation();
  const cartTitle = t("cartTitle");

  useEffect((): void => {
    dispatch(setAdditionals(additionals));
  }, [additionals]);

  return (
    <Layout title={cartTitle}>
      <Banner hero={hero} inner />
      <Cart />
    </Layout>
  );
};

CartPage.getInitialProps = async () => {
  const response = await fetch(
    "https://sushi-admin.herokuapp.com/additionals?_sort=published_at:ASC"
  );
  const additionals = await response.json();
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
    additionals,
    hero,
  };
};

export default CartPage;
