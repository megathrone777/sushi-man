import React, { useState } from "react";
import Link from "next/link";
import { useNotifications } from "reapop";

import { useStore, TCartProduct, addToCart } from "~/store";
import { TProps } from "./types";
import { SvgBuyIcon, SvgLoaderIcon } from "~/icons";
import {
  StyledWrapper,
  StyledContent,
  StyledDesc,
  StyledFooter,
  StyledImageHolder,
  StyledLayout,
  StyledLink,
  StyledPrice,
  StyledText,
  StyledTitle,
  StyledButton,
  StyledLoader,
  StyledImage,
} from "./styled";

const Item: React.FC<TProps> = ({
  allergeny,
  id,
  image,
  ingredients,
  isDrink,
  isRoll,
  isPoke,
  isSet,
  isSalat,
  price,
  slug,
  title,
  triggerModal,
  weight,
}) => {
  const [imageIsLoading, toggleImageLoading] = useState<boolean>(true);
  const { notify } = useNotifications();
  const { dispatch, store } = useStore();
  const { shopSettings } = store;

  const handleAddToCart = (product: TCartProduct): void => {
    if (shopSettings.shopIsClosed || shopSettings.ordersStop) {
      triggerModal(true);
      return;
    }

    dispatch(addToCart(product));
    notify({
      dismissAfter: 3000,
      dismissible: true,
      position: "bottom-center",
      showDismissButton: true,
      status: "success",
      title: `${product.title} přidán do košíku`,
    });
  };

  const handleImageLoading = (): void => {
    toggleImageLoading(false);
  };

  return (
    <StyledWrapper>
      <StyledImageHolder>
        <Link as={`/product/${id}`} href={`/product/[${id}]`} passHref>
          <StyledLink>
            {imageIsLoading && (
              <StyledLoader>
                <SvgLoaderIcon />
              </StyledLoader>
            )}

            <StyledImage
              alt={title}
              height={340}
              layout="responsive"
              objectFit="cover"
              onLoadingComplete={handleImageLoading}
              src={image.url}
              width={285}
            />
          </StyledLink>
        </Link>
      </StyledImageHolder>

      <StyledLayout>
        <StyledTitle>
          <Link as={`/product/${id}`} href={`/product/[${id}]`} passHref>
            <StyledLink>
              <StyledText>{title}</StyledText>
            </StyledLink>
          </Link>
        </StyledTitle>

        <StyledContent>
          <Link as={`/product/${id}`} href={`/product/[${id}]`} passHref>
            <StyledLink>
              <StyledDesc>
                <StyledText>{weight}</StyledText>
              </StyledDesc>

              {ingredients && (
                <StyledDesc>
                  <StyledText>{ingredients}</StyledText>
                </StyledDesc>
              )}

              {allergeny && (
                <StyledDesc>
                  <StyledText>{allergeny}</StyledText>
                </StyledDesc>
              )}
            </StyledLink>
          </Link>
        </StyledContent>

        <StyledFooter>
          <StyledPrice>
            <StyledText>{price} Kč</StyledText>
          </StyledPrice>

          <StyledButton
            onClick={() =>
              handleAddToCart({
                allergeny,
                image: {
                  url: image.url,
                },
                id,
                isRoll,
                isSalat,
                isDrink,
                isSet,
                isPoke,
                ingredients,
                price,
                product_modifiers: [],
                product_submodifiers: [],
                quantity: 1,
                slug,
                title,
                weight,
                totalPrice: parseInt(price),
              })
            }
          >
            <SvgBuyIcon />
          </StyledButton>
        </StyledFooter>
      </StyledLayout>
    </StyledWrapper>
  );
};

export { Item };
