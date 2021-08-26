import React from "react";

import useTranslation from "~/intl/useTranslation";
import { StyledWrapper, StyledImage } from "./styled";

export interface TMedia {
  locale: string;
  image: {
    url: string;
  };
}

interface TProps {
  banner: TMedia[];
}

const Media: React.FC<TProps> = ({ banner }) => {
  const { locale } = useTranslation();
  const content: TMedia = banner.find((item: TMedia) => item.locale === locale);

  return (
    <StyledWrapper>
      <StyledImage alt="Media" src={content.image.url} />
    </StyledWrapper>
  );
};

export { Media };
