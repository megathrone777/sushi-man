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
  StyledRadioWrapper,
  StyledRadioLabel,
  StyledRadioLabelInfo,
  StyledRadio,
  StyledNameInput,
  StyledDeliveryInput,
  StyledPhoneInput,
  StyledLink,
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
            onChange={handleDeliveryChange}
            type="radio"
            value="pickup"
          />
          <StyledRadioLabel htmlFor="input-pickup">
            Самовывоз <StyledRadioLabelInfo>-50Kč</StyledRadioLabelInfo>
          </StyledRadioLabel>
        </StyledRadioWrapper>
      </StyledHeader>

      <StyledLayout>
        {delivery === "delivery" && (
          <StyledContent isVisible={delivery === "delivery"}>
            <StyledInputWrapper>
              <StyledNameInput placeholder="Имя" type="text" />
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledPhoneInput placeholder="Телефон" type="tel" />
            </StyledInputWrapper>

            <StyledInputWrapper data-info="Cena dopravy: 500Kč">
              <StyledDeliveryInput placeholder="Введите адрес" type="text" />
            </StyledInputWrapper>
          </StyledContent>
        )}

        {delivery === "pickup" && (
          <StyledContent isVisible={delivery === "pickup"}>
            <StyledInputWrapper>
              <StyledNameInput placeholder="Имя" type="text" />
            </StyledInputWrapper>

            <StyledInputWrapper>
              <StyledPhoneInput placeholder="Телефон" type="tel" />
            </StyledInputWrapper>

            <StyledInfo>
              <StyledInfoLabel>Адрес для самовывоза:</StyledInfoLabel>
              <StyledLink
                href="https://goo.gl/maps/r6Tf6xHVnu59bD9J9"
                target="_blank"
              >
                Husitská 187/60, Praha 3
              </StyledLink>
            </StyledInfo>
          </StyledContent>
        )}
      </StyledLayout>
    </StyledWrapper>
  );
};

export { Delivery };
