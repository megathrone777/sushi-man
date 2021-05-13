import React from "react";
import Slider, { Settings } from "react-slick";

import useTranslation from "~/intl/useTranslation";
import {
  StyledWrapper,
  StyledLayout,
  StyledTitle,
  StyledItem,
  StyledItemLink,
  StyledItemImage,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

const Reviews: React.FC = () => {
  const { t } = useTranslation();

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
  const reviewsTitle = t("reviewsTitle");
  const reviewsImages = t("reviewsImages");

  return (
    <StyledWrapper id="reviews-section">
      <StyledContainer>
        <StyledLayout>
          <StyledTitle>{reviewsTitle}</StyledTitle>
          {reviewsImages && (
            <Slider {...settings}>
              {!!reviewsImages.length &&
                reviewsImages.map(
                  (image: string, index: number): React.ReactElement => (
                    <StyledItem key={index}>
                      <StyledItemLink
                        href="https://www.instagram.com/sushiman_prague"
                        target="_blank"
                      >
                        <StyledItemImage
                          src={`/images/reviews/${image}`}
                          alt="Review"
                        />
                      </StyledItemLink>
                    </StyledItem>
                  )
                )}
            </Slider>
          )}
        </StyledLayout>
      </StyledContainer>
    </StyledWrapper>
  );
};

export { Reviews };
