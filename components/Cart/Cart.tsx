import React, { useContext } from "react";

import useTranslation from "~/intl/useTranslation";
import { AppContext, TCartProduct, TAdditional } from "~/store";
import { Additionals } from "./Additionals";
import { Delivery } from "./Delivery";
import { Payment } from "./Payment";
import { Products } from "./Products";
import { Persons } from "./Persons";
import { StyledContainer } from "~/components/Layout/styled";
import {
  StyledWrapper,
  StyledTotal,
  StyledEmptyImage,
  StyledEmpty,
  StyledButtons,
  StyledBuy,
  StyledLayout,
} from "./styled";

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  const { cart } = state;
  const { cutleryTotalPrice, isPickupChecked } = cart;

  const addedProductsPrice: number[] = state.cart.products.map(
    ({ totalPrice }: TCartProduct): number => totalPrice
  );

  const addedAdditionalsPrice: number[] = state.cart.additionals.map(
    ({ price, quantity = 0 }: TAdditional) => price * quantity
  );

  const totalProductsPrice = addedProductsPrice.reduce(
    (accumulator, currentPrice) => accumulator + currentPrice,
    0
  );

  const totalAdditionalsPrice = addedAdditionalsPrice.reduce(
    (accumulator, currentPrice) => accumulator + currentPrice,
    0
  );

  const totalPrice =
    totalProductsPrice +
    totalAdditionalsPrice +
    cutleryTotalPrice +
    (isPickupChecked ? -50 : 0);

  return (
    <StyledWrapper>
      <StyledContainer>
        {cart && !!cart.products.length ? (
          <>
            <Products />
            <Persons />

            <StyledLayout>
              <Delivery />
              <Additionals />
            </StyledLayout>

            <Payment />
            <StyledTotal>
              {t("priceTotal")}: {totalPrice} Kč
            </StyledTotal>

            <StyledButtons>
              <StyledBuy type="button">{t("goToPay")}</StyledBuy>
            </StyledButtons>
          </>
        ) : (
          <StyledEmpty>
            <StyledEmptyImage alt="Sushi man" src="/images/sushi-man_img.jpg" />{" "}
            {t("cartIsEmpty")}
          </StyledEmpty>
        )}
      </StyledContainer>
    </StyledWrapper>
  );
};

export { Cart };
