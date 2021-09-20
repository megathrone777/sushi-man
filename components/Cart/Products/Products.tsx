import React, { useContext } from "react";
import Link from "next/link";

import {
  AppContext,
  TCartProduct,
  changeQuantity,
  removeFromCart,
} from "~/store";
import { SvgPlusIcon, SvgMinusIcon } from "~/icons";
import {
  StyledWrapper,
  StyledContent,
  StyledRow,
  StyledTitle,
  StyledImage,
  StyledLink,
  StyledBold,
  StyledQuantityWrapper,
  StyledQuantityInput,
  StyledQuantityButton,
  StyledPrice,
  StyledRemove,
  StyledWeight,
  StyledImageArea,
  StyledNameArea,
  StyledOptionsArea,
  StyledQuantityArea,
} from "./styled";

const Products: React.FC = () => {
  const { dispatch, state } = useContext(AppContext);
  const { cart } = state;
  const handleQuantityIncrease = (id: number, quantity: number): void => {
    dispatch(changeQuantity(id, quantity + 1));
  };

  const handleQuantityDecrease = (id: number, quantity: number): void => {
    if (quantity === 1) return;
    dispatch(changeQuantity(id, quantity - 1));
  };

  const handleProductRemove = (id: number): void => {
    dispatch(removeFromCart(id));
  };

  return (
    <StyledWrapper>
      <StyledTitle>Заказ</StyledTitle>

      <StyledContent>
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
            <StyledRow key={`${index}-${title}`}>
              <StyledImageArea>
                <Link as={`/product/${id}`} href={`/product/[${id}]`} passHref>
                  <StyledLink>
                    <StyledImage alt={title} src={image.url} />
                  </StyledLink>
                </Link>
              </StyledImageArea>

              <StyledNameArea>
                <StyledBold>{title}</StyledBold>
                <StyledWeight>{weight}</StyledWeight>
              </StyledNameArea>

              <StyledQuantityArea>
                <StyledQuantityWrapper>
                  <StyledQuantityButton
                    isIncrease
                    onClick={() => handleQuantityIncrease(id, quantity)}
                    type="button"
                  >
                    <SvgPlusIcon />
                  </StyledQuantityButton>
                  <StyledQuantityInput
                    min="1"
                    max="50"
                    type="number"
                    value={quantity ? quantity : 1}
                  />
                  <StyledQuantityButton
                    isDecrease
                    onClick={() => handleQuantityDecrease(id, quantity)}
                    type="button"
                  >
                    <SvgMinusIcon />
                  </StyledQuantityButton>
                </StyledQuantityWrapper>
              </StyledQuantityArea>

              <StyledOptionsArea>
                <StyledPrice>
                  {totalPrice ? `${totalPrice} Kč` : price}
                </StyledPrice>

                <StyledRemove
                  onClick={() => handleProductRemove(id)}
                  type="button"
                >
                  Удалить
                </StyledRemove>
              </StyledOptionsArea>
            </StyledRow>
          )
        )}
      </StyledContent>
    </StyledWrapper>
  );
};

export { Products };
