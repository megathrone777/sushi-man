import React, { useState } from "react";
import Link from "next/link";
import { useNotifications } from "reapop";

import { TProps } from "./types";
import { SvgBuyIcon } from "~/icons";
import { TProduct, ShopModal } from "~/components";
import { addToCart, TCartProduct, useStore } from "~/store";
import useTranslation from "~/intl/useTranslation";
import {
  StyledWrapper,
  StyledTitle,
  StyledList,
  StyledItem,
  StyledItemLayout,
  StyledItemImageHolder,
  StyledItemContent,
  StyledItemFooter,
  StyledItemPrice,
  StyledItemLink,
  StyledItemTitle,
  StyledItemDesc,
  StyledItemImage,
  StyledItemText,
  StyledItemButton,
  StyledScroller,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

const Products: React.FC<TProps> = ({ products }) => {
  const { t } = useTranslation();
  const [modalIsOpened, toggleModalOpened] = useState<boolean>(false);
  const { notify } = useNotifications();
  const { dispatch, store } = useStore();
  const { shopSettings } = store;
  const productsTitle = t("productsTitle");

  const handleScrollTo = (): void => {
    const deliverySection = document.getElementById("delivery-section");

    deliverySection &&
      deliverySection.scrollIntoView({
        behavior: "smooth",
      });
  };

  const handleAddToCart = (product: TCartProduct): void => {
    if (shopSettings.shopIsClosed || shopSettings.ordersStop) {
      toggleModalOpened(true);
      return;
    }

    dispatch(addToCart(product));
    notify({
      dismissAfter: 3000,
      dismissible: true,
      position: "bottom-center",
      showDismissButton: true,
      status: "success",
      title: `${product.title} добавлен в корзину`,
    });
  };

  const handleModalClose = (): void => {
    toggleModalOpened(false);
  };

  return (
    <StyledWrapper id="products-section">
      <StyledContainer>
        <StyledTitle>{productsTitle}</StyledTitle>
        {products && !!products.length && (
          <StyledList>
            {products.map(
              (
                {
                  allergeny,
                  id,
                  isRoll,
                  isSalat,
                  isDrink,
                  image,
                  title,
                  weight,
                  ingredients,
                  price,
                  slug,
                }: TProduct,
                index: number
              ): React.ReactElement => (
                <StyledItem key={index}>
                  <StyledItemImageHolder>
                    <Link
                      as={`/product/${id}`}
                      href={`/product/[${id}]`}
                      passHref
                    >
                      <StyledItemLink>
                        <StyledItemImage alt="Product" src={image.url} />
                      </StyledItemLink>
                    </Link>
                  </StyledItemImageHolder>

                  <StyledItemLayout>
                    <StyledItemTitle>
                      <StyledItemText>{title}</StyledItemText>
                    </StyledItemTitle>

                    <StyledItemContent>
                      <StyledItemDesc>
                        <StyledItemText>{weight}</StyledItemText>
                      </StyledItemDesc>

                      {ingredients && (
                        <StyledItemDesc>
                          <StyledItemText>{ingredients}</StyledItemText>
                        </StyledItemDesc>
                      )}

                      {allergeny && (
                        <StyledItemDesc>
                          <StyledItemText>{allergeny}</StyledItemText>
                        </StyledItemDesc>
                      )}
                    </StyledItemContent>

                    <StyledItemFooter>
                      <StyledItemPrice>
                        <StyledItemText>{price} Kč</StyledItemText>
                      </StyledItemPrice>

                      <StyledItemButton
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
                      </StyledItemButton>
                    </StyledItemFooter>
                  </StyledItemLayout>
                </StyledItem>
              )
            )}
          </StyledList>
        )}

        <StyledScroller onClick={handleScrollTo} type="button" />
        <ShopModal isOpened={modalIsOpened} close={handleModalClose} />
      </StyledContainer>
    </StyledWrapper>
  );
};

export { Products };
