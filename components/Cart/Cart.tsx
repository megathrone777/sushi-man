import React, { useContext, useState } from "react";

import { AppContext, TCartProduct, TAdditional } from "~/store";
import { Delivery } from "./Delivery";
import { Payment } from "./Payment";
import { Products } from "./Products";
import { StyledContainer } from "~/components/Layout/styled";
import { SvgPlusIcon, SvgMinusIcon } from "~/icons";
import {
  StyledWrapper,
  StyledTable,
  StyledTableCell,
  StyledTableRow,
  StyledTableCaption,
  StyledTotal,
  StyledSushiMan,
  StyledEmpty,
  StyledButtons,
  StyledBuy,
  StyledQuantityLabel,
  StyledQuantityPrice,
  StyledFooter,
  StyledPersons,
  StyledPersonsColumn,
  StyledPersonsText,
  StyledPersonsTextLabel,
  StyledAdditionalName,
  StyledQuantityWrapper,
  StyledQuantityInput,
  StyledQuantityButton,
  StyledPrice,
} from "./styled";

const Cart: React.FC = () => {
  const [cutlery, setCutlery] = useState<string>("0");
  const { dispatch, state } = useContext(AppContext);
  const { cart } = state;

  const addedProductsPrice: number[] = state.cart.products.map(
    ({ totalPrice }: TCartProduct) => totalPrice
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

  const totalPrice = totalProductsPrice + totalAdditionalsPrice;

  const handleAdditionalQuantityIncrease = (id: number): void => {
    // dispatch(addAdditional(id, +currentTarget.value));
  };

  const handleAdditionalQuantityDecrease = (id: number): void => {
    // dispatch(addAdditional(id, +currentTarget.value));
  };

  const handleCutleryQuantityChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    if (+currentTarget.value > 15) {
      setCutlery("15");
      return;
    }
    setCutlery(currentTarget.value);
  };

  return (
    <StyledWrapper>
      <StyledContainer>
        {cart && !!cart.products.length ? (
          <>
            <Products />

            <StyledPersons>
              <StyledPersonsColumn>
                <StyledQuantityWrapper>
                  <StyledQuantityLabel>
                    Количество человек:*
                  </StyledQuantityLabel>
                  <StyledQuantityButton
                    isIncrease
                    onClick={() => {}}
                    type="button"
                  >
                    <SvgPlusIcon />
                  </StyledQuantityButton>
                  <StyledQuantityInput
                    max="15"
                    onChange={handleCutleryQuantityChange}
                    type="number"
                    value={cutlery}
                  />
                  <StyledQuantityButton
                    isDecrease
                    onClick={() => {}}
                    type="button"
                  >
                    <SvgMinusIcon />
                  </StyledQuantityButton>
                </StyledQuantityWrapper>
                <StyledQuantityPrice>0 Kc</StyledQuantityPrice>
                <StyledPersonsText>До 3-х человек уже в цене</StyledPersonsText>
              </StyledPersonsColumn>

              <StyledPersonsColumn>
                <StyledPersonsText>
                  Добавьте ещё 1,2 ролла и получите{" "}
                  <StyledPersonsTextLabel>-50Kč</StyledPersonsTextLabel>
                </StyledPersonsText>
              </StyledPersonsColumn>
            </StyledPersons>

            <StyledFooter>
              <Delivery />

              {cart.additionals && !!cart.additionals.length && (
                <StyledTable isSmall>
                  <StyledTableCaption>Дополнительно</StyledTableCaption>
                  <tbody>
                    <StyledTableRow>
                      <StyledTableCell colSpan={3}>
                        fsdfasdrfasfassfd
                      </StyledTableCell>
                    </StyledTableRow>
                    {cart.additionals.map(
                      (
                        {
                          id: additionalId,
                          title,
                          quantity: additionalQuantity = 0,
                          price,
                        }: TAdditional,
                        index: number
                      ): React.ReactElement => (
                        <StyledTableRow key={`${index}-${title}`}>
                          <StyledTableCell>
                            <StyledAdditionalName>{title}</StyledAdditionalName>
                          </StyledTableCell>
                          <StyledTableCell>
                            <StyledQuantityWrapper>
                              <StyledQuantityButton
                                isIncrease
                                onClick={() =>
                                  handleAdditionalQuantityIncrease(additionalId)
                                }
                                type="button"
                              >
                                <SvgPlusIcon />
                              </StyledQuantityButton>
                              <StyledQuantityInput
                                min="1"
                                max="50"
                                onChange={() => {}}
                                type="number"
                                value={additionalQuantity}
                              />
                              <StyledQuantityButton
                                isDecrease
                                onClick={() =>
                                  handleAdditionalQuantityDecrease(additionalId)
                                }
                                type="button"
                              >
                                <SvgMinusIcon />
                              </StyledQuantityButton>
                            </StyledQuantityWrapper>
                          </StyledTableCell>
                          <StyledTableCell>
                            <StyledPrice>
                              {price * additionalQuantity} Kč
                            </StyledPrice>
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )}
                  </tbody>
                </StyledTable>
              )}
            </StyledFooter>

            <Payment />

            <StyledTotal>Общая цена: {totalPrice} Kč</StyledTotal>
            <StyledButtons>
              <StyledBuy type="button">Перейти к оплате</StyledBuy>
            </StyledButtons>
          </>
        ) : (
          <StyledEmpty>
            <StyledSushiMan alt="Sushi man" src="/images/sushi-man_img.jpg" />{" "}
            No products.
          </StyledEmpty>
        )}
      </StyledContainer>
    </StyledWrapper>
  );
};

export { Cart };
