import React, { useState } from "react";
import { useNotifications } from "reapop";
import Slider from "react-slick";
import Link from "next/link";
import { useRouter } from "next/router";

import { TProps } from "./types";
import useTranslation from "~/intl/useTranslation";
import { SvgBuyIcon, SvgLoaderIcon } from "~/icons";
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
  StyledAddButton,
  StyledLoader,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

const ProductsRecommended: React.FC<TProps> = ({ products }) => {
  const router = useRouter();
  const { dispatch } = useStore();
  const [imageIsLoading, toggleImageLoading] = useState<boolean>(true);
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
    if (product.isPoke) {
      router.push(`/product/[${product.slug}]`, `/product/${product.slug}`, {
        scroll: true,
      });
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
                  isDrink,
                  isSalat,
                  isPoke,
                  isSet,
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
                      as={`/product/${slug}`}
                      href={`/product/[${slug}]`}
                      passHref
                    >
                      <StyledItemLink>
                        {imageIsLoading && (
                          <StyledLoader>
                            <SvgLoaderIcon />
                          </StyledLoader>
                        )}

                        <StyledItemImage
                          alt={title}
                          layout="fill"
                          objectFit="cover"
                          onLoadingComplete={handleImageLoading}
                          src={image.url}
                        />
                      </StyledItemLink>
                    </Link>
                  </StyledItemImageHolder>

                  <StyledItemLayout>
                    <StyledItemTitle>
                      <Link
                        as={`/product/${slug}`}
                        href={`/product/[${slug}]`}
                        passHref
                      >
                        <StyledItemLink>
                          <StyledItemText>{title}</StyledItemText>
                        </StyledItemLink>
                      </Link>
                    </StyledItemTitle>

                    <StyledItemContent>
                      <Link
                        as={`/product/${slug}`}
                        href={`/product/[${slug}]`}
                        passHref
                      >
                        <StyledItemLink>
                          <StyledItemDesc>
                            <StyledItemText>{weight}</StyledItemText>
                          </StyledItemDesc>

                          <StyledItemDesc>
                            <StyledItemText>{ingredients}</StyledItemText>
                          </StyledItemDesc>

                          <StyledItemDesc>
                            <StyledItemText>{allergeny}</StyledItemText>
                          </StyledItemDesc>
                        </StyledItemLink>
                      </Link>
                    </StyledItemContent>

                    <StyledItemFooter>
                      <StyledItemPrice>
                        <StyledItemText>{price} Kč</StyledItemText>
                      </StyledItemPrice>

                      <StyledAddButton
                        onClick={() =>
                          handleAddToCart({
                            allergeny,
                            image: {
                              url: image.url,
                            },
                            id,
                            ingredients,
                            isRoll,
                            isDrink,
                            isSalat,
                            isSet,
                            isPoke,
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
                      </StyledAddButton>
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
