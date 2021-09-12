import React from "react";

import useTranslation from "~/intl/useTranslation";
import {
  StyledWrapper,
  StyledLayout,
  StyledImage,
  StyledTitle,
  StyledText,
  StyledButton,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

export interface TBanner {
  image: {
    url: string;
  };
  locale: string;
  text: string;
  title: string;
}

interface TProps {
  hero: {
    hero_cs: TBanner;
    hero_ru: TBanner;
  };
  inner?: boolean;
}

const Banner: React.FC<TProps> = ({ hero, inner }) => {
  const { locale, t } = useTranslation();
  const content = hero[`hero_${locale}`];
  const welcomeButton = t("welcomeButton");

  const handleClick = (
    event: React.SyntheticEvent<HTMLAnchorElement>
  ): void => {
    event.preventDefault();
    const productsSection = document.getElementById("contacts-section");

    productsSection &&
      productsSection.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <StyledWrapper inner={inner}>
      <StyledImage inner={inner} src={content.image.url} alt="Media" />

      <StyledLayout inner={inner}>
        <StyledContainer>
          <StyledTitle dangerouslySetInnerHTML={{ __html: content.title }} />
          <StyledText dangerouslySetInnerHTML={{ __html: content.text }} />
          {!inner && (
            <StyledButton href="#" onClick={handleClick}>
              {welcomeButton}
            </StyledButton>
          )}
        </StyledContainer>
      </StyledLayout>
    </StyledWrapper>
  );
};

export { Banner };
