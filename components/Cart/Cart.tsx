import React, { useContext } from "react";

import {
  AppContext,
  TCartProduct,
  changeQuantity,
  TAdditional,
  addAdditional,
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
  StyledQuantity,
  StyledTotal,
  StyledSushiMan,
  StyledEmpty,
  StyledButtons,
  StyledBuy,
} from "./styled";

const Cart: React.FC = () => {
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

  const handleQuantityChange = (
    { currentTarget }: React.SyntheticEvent<HTMLInputElement>,
    id: number
  ): void => {
    dispatch(changeQuantity(id, +currentTarget.value));
  };

  const handleAdditionalQuantityChange = (
    { currentTarget }: React.SyntheticEvent<HTMLInputElement>,
    id: number
  ): void => {
    dispatch(addAdditional(id, +currentTarget.value));
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
                          <StyledQuantity
                            min="1"
                            max="50"
                            onChange={(
                              event: React.SyntheticEvent<HTMLInputElement>
                            ) => handleQuantityChange(event, id)}
                            type="number"
                            value={quantity ? quantity : 1}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <StyledBold>
                            {totalPrice ? `${totalPrice} Kč` : price}
                          </StyledBold>
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
                            <StyledQuantity
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
