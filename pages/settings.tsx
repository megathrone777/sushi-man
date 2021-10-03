import React from "react";
import { NextPage } from "next";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";

import client from "~/apollo-client";
import { useStore, setShopSettings } from "~/store";

const SettingsPage: NextPage = () => {
  const { dispatch, state } = useStore();
  const { shopSettings } = state;
  const [sendShopSettings] = useMutation(
    gql`
      mutation Mutation($updateShopInput: updateShopInput) {
        updateShop(input: $updateShopInput) {
          shop {
            shopIsClosed
          }
        }
      }
    `,
    { client }
  );

  const handleClick = (): void => {
    sendShopSettings({
      variables: {
        updateShopInput: {
          data: {
            shopIsClosed: !shopSettings.shopIsClosed,
          },
        },
      },
    });
    dispatch(
      setShopSettings({
        ...shopSettings,
        shopIsClosed: !shopSettings.shopIsClosed,
      })
    );
  };

  return (
    <div>
      <Link href="/" passHref>
        <a>Main page</a>
      </Link>
      
      <button onClick={handleClick} type="button">
        {shopSettings.shopIsClosed ? "Open shop" : "Close shop"}
      </button>
    </div>
  );
};

export default SettingsPage;
