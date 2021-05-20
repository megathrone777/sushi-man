import React, { useState } from "react";
import Slider, { Settings } from "react-slick";
// import { useNotifications } from "reapop";

import { Modal } from "~/components";
import { TProduct } from "~/store";
import useTranslation from "~/intl/useTranslation";
import {
  StyledWrapper,
  StyledLayout,
  StyledTitle,
  StyledList,
  StyledItem,
  StyledItemImageHolder,
  StyledItemContent,
  StyledItemFooter,
  StyledItemPrice,
  StyledItemTitle,
  StyledItemDesc,
  StyledItemImage,
  StyledItemText,
  StyledSVGSymbol,
  StyledPathSymbol,
  StyledItemButton,
  StyledScroller,
  StyledSlider,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

interface TProps {
  productsList: TProduct[];
}

const Products: React.FC<TProps> = ({ productsList }) => {
  const { t } = useTranslation();
  const [modalIsOpened, toggleModalOpened] = useState<boolean>(false);
  // const { notify } = useNotifications();
  // const { dispatch } = useContext(AppContext);
  const productsTitle = t("productsTitle");

  const settings: Settings = {
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleModal = (): void => {
    toggleModalOpened(!modalIsOpened);
  };

  const handleModalClose = (): void => {
    toggleModalOpened(false);
  };

  const handleScrollTo = (): void => {
    const deliverySection = document.getElementById("delivery-section");

    deliverySection &&
      deliverySection.scrollIntoView({
        behavior: "smooth",
      });
  };

  // const handleBuy = ({
  //   cutleryAmount,
  //   id,
  //   image,
  //   title,
  //   weight,
  //   ingredients,
  //   allergeny,
  //   price,
  //   totalPrice,
  //   quantity,
  // }: TCartProduct): void => {
  //   dispatch(
  //     addToCart({
  //       cutleryAmount,
  //       id,
  //       image,
  //       title,
  //       weight,
  //       ingredients,
  //       allergeny,
  //       price,
  //       totalPrice,
  //       quantity,
  //     })
  //   );
  //   notify({
  //     dismissAfter: 5000,
  //     dismissible: true,
  //     position: "bottom-center",
  //     showDismissButton: true,
  //     status: "success",
  //     title: `Product ${title} добавлен`,
  //   });
  // };

  const productsItems =
    productsList &&
    productsList.map(
      (
        { image, title, weight, ingredients, allergeny, price }: TProduct,
        index: number
      ): React.ReactElement => (
        <StyledItem key={index}>
          <StyledItemImageHolder>
            <StyledItemImage alt="Product" src={image.url} />
          </StyledItemImageHolder>

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

            <StyledItemButton onClick={handleModal}>
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
        </StyledItem>
      )
    );

  return (
    <StyledWrapper id="products-section">
      <StyledContainer>
        <StyledLayout>
          <StyledTitle>{productsTitle}</StyledTitle>
          {productsList && (
            <StyledSlider>
              <Slider {...settings}>{productsItems}</Slider>
            </StyledSlider>
          )}

          {productsList && (
            <StyledList>{!!productsList.length && productsItems}</StyledList>
          )}
        </StyledLayout>

        <StyledScroller onClick={handleScrollTo} type="button" />
      </StyledContainer>

      <Modal isOpened={modalIsOpened} close={handleModalClose} />
    </StyledWrapper>
  );
};

export { Products };
