import React, { useState } from "react";
import Slider, { Settings } from "react-slick";

import { Modal } from "~/components";
import useTranslation from "~/intl/useTranslation";
import {
  StyledWrapper,
  StyledLayout,
  StyledTitle,
  StyledItem,
  StyledItemLink,
  StyledItemImage,
  StyledButton,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

export interface TReview {
  id: number;
  image: [
    {
      url: string;
    }
  ];
}

interface TProps {
  reviews: TReview[];
}

const Reviews: React.FC<TProps> = ({ reviews }) => {
  const { t } = useTranslation();
  const [modalIsOpened, toggleModalOpened] = useState<boolean>(false);
  const reviewsTitle = t("reviewsTitle");
  const reviewsButton = t("reviewsButton");

  const settings: Settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1235,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
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

  return (
    <StyledWrapper id="reviews-section">
      <StyledContainer>
        <StyledLayout>
          <StyledTitle>{reviewsTitle}</StyledTitle>
          {reviews && (
            <Slider {...settings}>
              {!!reviews.length &&
                reviews.map(
                  (
                    { id, image }: TReview,
                    index: number
                  ): React.ReactElement => (
                    <StyledItem key={`${id}-${index}-review`}>
                      <StyledItemLink
                        href="https://www.instagram.com/sushiman_prague"
                        target="_blank"
                      >
                        <StyledItemImage src={image[0].url} alt="Review" />
                      </StyledItemLink>
                    </StyledItem>
                  )
                )}
            </Slider>
          )}

          <StyledButton onClick={handleModal} type="button">
            {reviewsButton}
          </StyledButton>
        </StyledLayout>

        <Modal isOpened={modalIsOpened} close={handleModalClose} />
      </StyledContainer>
    </StyledWrapper>
  );
};

export { Reviews };
