import React from "react";
import { gql, useMutation } from "@apollo/client";

import client from "~/apollo-client";
import { useStore, setShopSettings } from "~/store";
import { StyledButton, StyledWrapper, StyledDivider } from "./styled";

const Settings: React.FC = () => {
  const { dispatch, store } = useStore();
  const { shopSettings } = store;
  const [sendOrdersStop] = useMutation(
    gql`
      mutation Mutation($updateShopInput: updateShopInput) {
        updateShop(input: $updateShopInput) {
          shop {
            ordersStop
          }
        }
      }
    `,
    { client }
  );

  const handleOrdersStopToggle = (): void => {
    sendOrdersStop({
      variables: {
        updateShopInput: {
          data: {
            ordersStop: !shopSettings.ordersStop,
          },
        },
      },
    });

    dispatch(
      setShopSettings({
        ...shopSettings,
        ordersStop: !shopSettings.ordersStop,
      })
    );
  };

  return (
    <StyledWrapper>
      <StyledDivider />

      <StyledButton onClick={handleOrdersStopToggle} type="button">
        {shopSettings.ordersStop
          ? "Запустить приёмку заказов"
          : "Остановить приёмку заказов"}
      </StyledButton>
    </StyledWrapper>
  );
};

export { Settings };
