import React from "react";
import { gql, useMutation } from "@apollo/client";

import client from "~/apollo-client";
import { useStore, setShopSettings } from "~/store";
import { StyledButton, StyledWrapper, StyledDivider } from "./styled";

const Settings: React.FC = () => {
  const { dispatch, store } = useStore();
  const { shopSettings } = store;
  const { shopIsClosed, ordersStop } = shopSettings;
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

  const handleShopClosedToggle = (): void => {
    sendShopIsClosed({
      variables: {
        updateShopInput: {
          data: {
            shopIsClosed: !shopIsClosed,
          },
        },
      },
    });

    dispatch(
      setShopSettings({
        ...shopSettings,
        shopIsClosed: !shopIsClosed,
      })
    );
  };

  const handleOrdersStopToggle = (): void => {
    sendOrdersStop({
      variables: {
        updateShopInput: {
          data: {
            ordersStop: !ordersStop,
          },
        },
      },
    });

    dispatch(
      setShopSettings({
        ...shopSettings,
        ordersStop: !ordersStop,
      })
    );
  };

  return (
    <StyledWrapper>
      <StyledButton
        onClick={handleShopClosedToggle}
        isActive={shopIsClosed}
        type="button"
      >
        {shopIsClosed ? "Открыть смену" : "Закрыть смену"}
      </StyledButton>

      <StyledDivider />

      <StyledButton
        onClick={handleOrdersStopToggle}
        isActive={ordersStop}
        type="button"
      >
        {ordersStop
          ? "Запустить приёмку заказов"
          : "Остановить приёмку заказов"}
      </StyledButton>
    </StyledWrapper>
  );
};

export { Settings };
