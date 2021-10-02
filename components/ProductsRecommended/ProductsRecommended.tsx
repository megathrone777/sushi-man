import React from "react";
import { useNotifications } from "reapop";
import Slider from "react-slick";
import Link from "next/link";


import { TProps } from "./types";
import useTranslation from "~/intl/useTranslation";
import { SvgBuyIcon } from "~/icons";
import { addToCart, TCartProduct, useStore } from "~/store";
import { TProduct } from "~/components";
import {
  StyledWrapper,
  StyledTitle,
  StyledItemContent,
  StyledItemDesc,
  StyledItemFooter,
  StyledItemImage,
  StyledItemImageHolder,
  StyledItemLayout,
  StyledItemLink,
  StyledItemPrice,
  StyledItemText,
  StyledItemTitle,
  StyledItem,
  StyledItemButton,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

const ProductsRecommended: React.FC<TProps> = ({ products }) => {
  const { dispatch } = useStore();
  const { t } = useTranslation();
  const { notify } = useNotifications();
  const productsTitle = t("recommendedTitle");
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleAddToCart = (product: TCartProduct): void => {
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

  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledTitle>{productsTitle}</StyledTitle>
        {products && !!products.length && (
          <Slider {...settings}>
            {products.map(
              (
                {
                  allergeny,
                  id,
                  image,
                  isRoll,
                  persons,
                  title,
                  weight,
                  ingredients,
                  product_modifiers,
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

                      <StyledItemDesc>
                        <StyledItemText>{ingredients}</StyledItemText>
                      </StyledItemDesc>

                      <StyledItemDesc>
                        <StyledItemText>{allergeny}</StyledItemText>
                      </StyledItemDesc>
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
                            ingredients,
                            isRoll,
                            persons,
                            price,
                            product_modifiers,
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
          </Slider>
        )}
      </StyledContainer>
    </StyledWrapper>
  );
};

export { ProductsRecommended };
