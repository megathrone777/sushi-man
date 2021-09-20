import React, { useState } from "react";

import {
  StyledWrapper,
  StyledColumn,
  StyledHeader,
  StyledImage,
  StyledTitle,
  StyledRadioWrapper,
  StyledRadio,
  StyledRadioLabel,
} from "./styled";

type TPayment = "card" | "cash";

const Payment: React.FC = () => {
  const [payment, setPayment] = useState("card");

  const handlePaymentChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    const name = currentTarget.value;

    setPayment(name as TPayment);
  };

  return (
    <StyledWrapper>
      <StyledTitle>Оплата</StyledTitle>

      <StyledHeader>
        <StyledColumn>
          <StyledRadioWrapper>
            <StyledRadio
              checked={payment === "card"}
              id="input-card"
              name="input-payment"
              onChange={handlePaymentChange}
              type="radio"
              value="card"
            />
            <StyledRadioLabel htmlFor="input-card">
              Картой на месте или онлайн
            </StyledRadioLabel>
          </StyledRadioWrapper>

          <StyledImage alt="Card" src="/images/payments_img.png" />
        </StyledColumn>

        <StyledColumn>
          <StyledRadioWrapper>
            <StyledRadio
              id="input-cash"
              name="input-payment"
              onChange={handlePaymentChange}
              type="radio"
              value="cash"
            />
            <StyledRadioLabel htmlFor="input-cash">Наличными</StyledRadioLabel>
          </StyledRadioWrapper>

          <StyledImage alt="Card" src="/images/cash_img.jpg" />
        </StyledColumn>
      </StyledHeader>
    </StyledWrapper>
  );
};

export { Payment };
