import React from "react";

import useTranslation from "~/intl/useTranslation";
import { StyledWrapper, StyledImage } from "./styled";

const Media: React.FC = () => {
  const { t } = useTranslation();
  const mediaImage = t("mediaImage");

  return (
    <StyledWrapper>
      <StyledImage alt="Media" src={`/images/${mediaImage}`} />
    </StyledWrapper>
  );
};

export { Media };
