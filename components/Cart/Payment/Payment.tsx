import React from "react";

import { useStore, TPayment, setPaymentType } from "~/store";
import useTranslation from "~/intl/useTranslation";
import {
  StyledWrapper,
  StyledColumn,
  StyledHeader,
  StyledImage,
  StyledTitle,
  StyledRadioWrapper,
  StyledRadio,
  StyledRadioLabel,
  StyledRadioLabelText,
} from "./styled";

const Payment: React.FC = () => {
  const { t } = useTranslation();
  const { dispatch, store } = useStore();
  const { cart } = store;
  const { paymentType } = cart;

  const handlePaymentChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    dispatch(setPaymentType(currentTarget.value as TPayment));
  };

  return (
    <StyledWrapper>
      <StyledTitle>{t("paymentMethods")}</StyledTitle>

      <StyledHeader>
        <StyledColumn>
          <StyledRadioWrapper>
            <StyledRadio
              checked={paymentType === "card"}
              id="input-card"
              name="input-payment"
              onChange={handlePaymentChange}
              type="radio"
              value="card"
            />
            <StyledRadioLabel htmlFor="input-card">
              <StyledRadioLabelText>{t("payByCard")}</StyledRadioLabelText>
              <StyledImage alt="Card" src="/images/payments_img.png" />
            </StyledRadioLabel>
          </StyledRadioWrapper>
        </StyledColumn>

        <StyledColumn>
          <StyledRadioWrapper>
            <StyledRadio
              checked={paymentType === "cash"}
              id="input-cash"
              name="input-payment"
              onChange={handlePaymentChange}
              type="radio"
              value="cash"
            />
            <StyledRadioLabel htmlFor="input-cash">
              <StyledRadioLabelText>{t("payByCash")}</StyledRadioLabelText>
              <StyledImage alt="Card" src="/images/cash_img.jpg" />
            </StyledRadioLabel>
          </StyledRadioWrapper>
        </StyledColumn>
      </StyledHeader>
    </StyledWrapper>
  );
};

export { Payment };
