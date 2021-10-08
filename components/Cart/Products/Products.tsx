import React from "react";
import Link from "next/link";

import useTranslation from "~/intl/useTranslation";
import {
  TCartProduct,
  changeQuantity,
  removeFromCart,
  useStore,
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
  StyledQuantity,
  StyledQuantityButton,
  StyledPrice,
  StyledRemove,
  StyledWeight,
  StyledImageArea,
  StyledNameArea,
  StyledOptionsArea,
  StyledQuantityArea,
  StyledModifiersList,
  StyledModifiersItem,
} from "./styled";
import { TProductModifier } from "~/components";

const Products: React.FC = () => {
  const { t } = useTranslation();
  const { dispatch, state } = useStore();
  const { cart } = state;

  const handleQuantityIncrease = (
    id: number,
    quantity: number,
    persons: number
  ): void => {
    dispatch(changeQuantity(id, quantity + 1, persons));
  };

  const handleQuantityDecrease = (
    id: number,
    quantity: number,
    persons: number
  ): void => {
    if (quantity === 1) return;
    dispatch(changeQuantity(id, quantity - 1, persons * -1));
  };

  const handleProductRemove = (
    id: number,
    quantity: number,
    persons: number
  ): void => {
    dispatch(removeFromCart(id, quantity, persons));
  };

  return (
    <StyledWrapper>
      <StyledTitle>{t("order")}</StyledTitle>

      <StyledContent>
        {cart.products.map(
          (
            {
              id,
              title,
              image,
              weight,
              persons,
              price,
              product_modifiers,
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
                {product_modifiers && !!product_modifiers.length && (
                  <StyledModifiersList>
                    {product_modifiers.map(
                      ({ name }: TProductModifier): React.ReactElement => (
                        <StyledModifiersItem key={`${index}-${name}`}>
                          {name.substring(6, name.length)}
                        </StyledModifiersItem>
                      )
                    )}
                  </StyledModifiersList>
                )}
              </StyledNameArea>

              <StyledQuantityArea>
                <StyledQuantityWrapper>
                  <StyledQuantityButton
                    isDecrease
                    onClick={() =>
                      handleQuantityDecrease(id, quantity, persons)
                    }
                    type="button"
                  >
                    <SvgMinusIcon />
                  </StyledQuantityButton>
                  <StyledQuantity>{quantity ? quantity : 1}</StyledQuantity>
                  <StyledQuantityButton
                    isIncrease
                    onClick={() =>
                      handleQuantityIncrease(id, quantity, persons)
                    }
                    type="button"
                  >
                    <SvgPlusIcon />
                  </StyledQuantityButton>
                </StyledQuantityWrapper>
              </StyledQuantityArea>

              <StyledOptionsArea>
                <StyledPrice>
                  {totalPrice ? `${totalPrice} Kč` : price}
                </StyledPrice>

                <StyledRemove
                  onClick={() => handleProductRemove(id, quantity, persons)}
                  type="button"
                >
                  {t("remove")}
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
