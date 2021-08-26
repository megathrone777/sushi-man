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
  locale: string;
  text: string;
  title: string;
}

interface TProps {
  inner?: boolean;
  hero: TBanner[];
}

const Banner: React.FC<TProps> = ({ hero, inner }) => {
  const { locale, t } = useTranslation();
  const content: TBanner = hero.find((item: TBanner) => item.locale === locale);
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
      <StyledImage src="/images/media_img.jpg" alt="Media" />

      <StyledLayout>
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
