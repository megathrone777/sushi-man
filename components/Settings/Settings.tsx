import React from "react";
import { gql, useMutation } from "@apollo/client";

import client from "~/apollo-client";
import { useStore, setShopSettings } from "~/store";
import { StyledButton, StyledWrapper, StyledDivider } from "./styled";

const Settings: React.FC = () => {
  const { dispatch, state } = useStore();
  const { shopSettings } = state;
  const [sendShopIsClosed] = useMutation(
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

  const handleShopClosedToggle = (): void => {
    sendShopIsClosed({
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
      <StyledButton onClick={handleShopClosedToggle} type="button">
        {shopSettings.shopIsClosed ? "Открыть смену" : "Закрыть смену"}
      </StyledButton>

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
