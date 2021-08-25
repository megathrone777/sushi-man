import React from "react";

import useTranslation from "~/intl/useTranslation";
import { StyledWrapper, StyledTitle, StyledText } from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

export interface TAbout {
  locale: string;
  text: string;
  title: string;
}

interface TProps {
  about: TAbout[];
}

const About: React.FC<TProps> = ({ about }) => {
  const { locale } = useTranslation();
  const content: TAbout = about.find((item: TAbout) => item.locale === locale);

  return (
    <StyledWrapper id="about-section">
      <StyledContainer>
        <StyledTitle>{content.title}</StyledTitle>
        <StyledText dangerouslySetInnerHTML={{ __html: content.text }} />
      </StyledContainer>
    </StyledWrapper>
  );
};

export { About };
