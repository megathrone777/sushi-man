import React from "react";

import { TProps } from "./types";
import useTranslation from "~/intl/useTranslation";
import { StyledWrapper, StyledTitle, StyledText } from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

const About: React.FC<TProps> = ({ about }) => {
  const { locale } = useTranslation();
  const content = about[`about_${locale}`];

  return (
    <StyledWrapper id="about-section">
      <StyledContainer>
        {content.title && <StyledTitle>{content.title}</StyledTitle>}
        {content.text && (
          <StyledText dangerouslySetInnerHTML={{ __html: content.text }} />
        )}
      </StyledContainer>
    </StyledWrapper>
  );
};

export { About };
