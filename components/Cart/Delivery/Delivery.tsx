import React, { useState } from "react";

import {
  StyledWrapper,
  StyledContent,
  StyledHeader,
  StyledInfo,
  StyledInfoLabel,
  StyledInputWrapper,
  StyledLayout,
  StyledTitle,
} from "./styled";

type TDelivery = "delivery" | "pickup";

const Delivery: React.FC = () => {
  const [delivery, setDelivery] = useState<TDelivery>("delivery");

  const handleDeliveryChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    const name = currentTarget.value;

    setDelivery(name as TDelivery);
  };

  return (
    <StyledWrapper>
      <StyledTitle>Доставка</StyledTitle>
      <StyledHeader>
        <StyledRadioWrapper>
          <StyledRadio
            checked={delivery === "delivery"}
            id="input-delivery"
            name="delivery-pickup"
            onChange={handleDeliveryChange}
            type="radio"
            value="delivery"
          />
          <StyledRadioLabel htmlFor="input-delivery">
            Доставка курьером
          </StyledRadioLabel>
        </StyledRadioWrapper>

        <StyledRadioWrapper>
          <StyledRadio
            id="input-pickup"
            name="delivery-pickup"
            onChange={handleDeliveryPickupChange}
            type="radio"
            value="pickup"
          />
          <StyledRadioLabel htmlFor="input-pickup">Самовывоз</StyledRadioLabel>
        </StyledRadioWrapper>
      </StyledDeliveryHeader>

      <StyledDeliveryLayout>
        {deliveryPickup === "delivery" && (
          <StyledDeliveryContent isVisible={deliveryPickup === "delivery"}>
            <StyledDeliveryInputWrapper>
              <StyledNameInput placeholder="Имя" type="text" />
            </StyledDeliveryInputWrapper>

            <StyledDeliveryInputWrapper>
              <StyledPhoneInput placeholder="Телефон" type="tel" />
            </StyledDeliveryInputWrapper>

            <StyledDeliveryInputWrapper>
              <StyledDeliveryInput placeholder="Введите адрес" type="text" />
            </StyledDeliveryInputWrapper>
          </StyledDeliveryContent>
        )}

        {deliveryPickup === "pickup" && (
          <StyledDeliveryContent isVisible={deliveryPickup === "pickup"}>
            <StyledDeliveryInputWrapper>
              <StyledNameInput placeholder="Имя" type="text" />
            </StyledDeliveryInputWrapper>

            <StyledDeliveryInputWrapper>
              <StyledPhoneInput placeholder="Телефон" type="tel" />
            </StyledDeliveryInputWrapper>

            <StyledDeliveryPickup>
              <StyledDeliveryPickupLabel>
                Адрес для самовывоза:
              </StyledDeliveryPickupLabel>
              <StyledLink
                href="https://goo.gl/maps/r6Tf6xHVnu59bD9J9"
                target="_blank"
              >
                Husitská 187/60, Praha 3
              </StyledLink>
            </StyledDeliveryPickup>
          </StyledDeliveryContent>
        )}
      </StyledDeliveryLayout>
    </StyledWrapper>
  );
};

export { Delivery };
