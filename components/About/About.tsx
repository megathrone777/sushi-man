import React from "react";

import useTranslation from "~/intl/useTranslation";
import { StyledWrapper, StyledTitle, StyledText } from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

const About: React.FC = () => {
  const { t } = useTranslation();
  const aboutTitle = t("aboutTitle");
  const aboutText = t("aboutText");

  return (
    <StyledWrapper id="about-section">
      <StyledContainer>
        <StyledTitle>{aboutTitle}</StyledTitle>
        <StyledText dangerouslySetInnerHTML={{ __html: aboutText }} />
      </StyledContainer>
    </StyledWrapper>
  );
};

export { About };
