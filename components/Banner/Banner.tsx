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

interface TProps {
  inner?: boolean;
}

const Banner: React.FC<TProps> = ({ inner }) => {
  const { t } = useTranslation();
  const welcomeTitle = t("welcomeTitle");
  const welcomeSubTitle = t("welcomeSubTitle");
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
          <StyledTitle dangerouslySetInnerHTML={{ __html: welcomeTitle }} />
          <StyledText dangerouslySetInnerHTML={{ __html: welcomeSubTitle }} />
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
