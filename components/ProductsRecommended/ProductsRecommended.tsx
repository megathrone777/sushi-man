import React, { useContext } from "react";
import { useNotifications } from "reapop";
import Slider from "react-slick";
import Link from "next/link";

import useTranslation from "~/intl/useTranslation";
import { addToCart, AppContext, TCartProduct } from "~/store";
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
  StyledPathSymbol,
  StyledSVGSymbol,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

interface TProps {
  products: TProduct[];
}

const ProductsRecommended: React.FC<TProps> = ({ products }) => {
  const { dispatch } = useContext(AppContext);
  const { t } = useTranslation();
  const { notify } = useNotifications();
  const productsTitle = t("recommendedTitle");
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
                            cutleryAmount: 1,
                            image: {
                              url: image.url,
                            },
                            id,
                            ingredients,
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
                        <StyledSVGSymbol
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <StyledPathSymbol d="M0 0h24v24H0V0z" fill="none" />
                          <StyledPathSymbol
                            d="M22 9h-4.79l-4.38-6.56c-.19-.28-.51-.42-.83-.42s-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1
                  0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23
                  10c0-.55-.45-1-1-1zM12 4.8L14.8 9H9.2L12 4.8zM18.5 19l-12.99.01L3.31 11H20.7l-2.2 8zM12 13c-1.1
                  0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                            fill="currentColor"
                          />
                        </StyledSVGSymbol>
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
