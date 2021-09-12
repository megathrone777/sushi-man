import React, { useContext, useState } from "react";

import {
  AppContext,
  TCartProduct,
  changeQuantity,
  TAdditional,
  addAdditional,
  removeFromCart,
} from "~/store";
import { StyledContainer } from "~/components/Layout/styled";
import {
  StyledWrapper,
  StyledTable,
  StyledLayout,
  StyledTableCell,
  StyledTableRow,
  StyledBold,
  StyledTableCaption,
  StyledImage,
  StyledQuantityInput,
  StyledQuantityButton,
  StyledTotal,
  StyledSushiMan,
  StyledEmpty,
  StyledButtons,
  StyledBuy,
  StyledRemove,
  StyledQuantityWrapper,
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

  const handleQuantityIncrease = (id: number, quantity: number): void => {
    dispatch(changeQuantity(id, quantity + 1));
  };

  const handleQuantityDecrease = (id: number, quantity: number): void => {
    dispatch(changeQuantity(id, quantity - 1));
  };

  const handleAdditionalQuantityChange = (
    { currentTarget }: React.SyntheticEvent<HTMLInputElement>,
    id: number
  ): void => {
    dispatch(addAdditional(id, +currentTarget.value));
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

  const handleProductRemove = (id: number): void => {
    dispatch(removeFromCart(id));
  };

  return (
    <StyledWrapper>
      <StyledContainer>
        {cart && !!cart.products.length ? (
          <>
            <StyledLayout>
              <StyledTable>
                <StyledTableCaption>Заказ</StyledTableCaption>
                <tbody>
                  {cart.products.map(
                    (
                      {
                        id,
                        title,
                        image,
                        weight,
                        price,
                        quantity,
                        totalPrice,
                      }: TCartProduct,
                      index: number
                    ): React.ReactElement => (
                      <StyledTableRow key={`${index}-${title}`}>
                        <StyledTableCell>
                          <StyledImage alt={title} src={image.url} />
                        </StyledTableCell>
                        <StyledTableCell>
                          <StyledBold>{title}</StyledBold>
                          <br />
                          {weight}
                        </StyledTableCell>
                        <StyledTableCell>
                          <StyledQuantityWrapper>
                            <StyledQuantityButton
                              isIncrease
                              onClick={() =>
                                handleQuantityIncrease(id, quantity)
                              }
                              type="button"
                            >
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 
                                  0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 
                                  0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                />
                              </svg>
                            </StyledQuantityButton>
                            <StyledQuantityInput
                              min="1"
                              max="50"
                              type="number"
                              value={quantity ? quantity : 1}
                            />
                            <StyledQuantityButton
                              isDecrease
                              onClick={() =>
                                handleQuantityDecrease(id, quantity)
                              }
                              type="button"
                            >
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path
                                  fill="currentColor"
                                  d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 
                                  32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                />
                              </svg>
                            </StyledQuantityButton>
                          </StyledQuantityWrapper>
                        </StyledTableCell>
                        <StyledTableCell>
                          <StyledBold>
                            {totalPrice ? `${totalPrice} Kč` : price}
                          </StyledBold>
                        </StyledTableCell>
                        <StyledTableCell>
                          <StyledRemove
                            onClick={() => handleProductRemove(id)}
                            type="button"
                          >
                            x
                          </StyledRemove>
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  )}
                </tbody>
              </StyledTable>

              {cart.additionals && !!cart.additionals.length && (
                <StyledTable isSmall>
                  <StyledTableCaption>Дополнительно</StyledTableCaption>
                  <tbody>
                    {cart.additionals.map(
                      (
                        {
                          id,
                          title,
                          quantity: additionalQuantity = 0,
                          price,
                        }: TAdditional,
                        index: number
                      ): React.ReactElement => (
                        <StyledTableRow key={`${index}-${title}`}>
                          <StyledTableCell>
                            <StyledBold>{title}</StyledBold>
                          </StyledTableCell>
                          <StyledTableCell>
                            <StyledQuantityInput
                              min="1"
                              max="50"
                              onChange={(
                                event: React.SyntheticEvent<HTMLInputElement>
                              ) => handleAdditionalQuantityChange(event, id)}
                              type="number"
                              value={additionalQuantity}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <StyledBold>
                              {price * additionalQuantity} Kč
                            </StyledBold>
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )}
                  </tbody>
                </StyledTable>
              )}
            </StyledLayout>

            <p>
              Количество человек:{" "}
              <input
                type="number"
                value={cutlery}
                onChange={handleCutleryQuantityChange}
                max="15"
              />
            </p>

            <StyledTotal>Общая цена: {totalPrice}</StyledTotal>
            <StyledButtons>
              <StyledBuy type="button">Купить</StyledBuy>
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
