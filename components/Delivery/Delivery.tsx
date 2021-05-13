import React from "react";

import useTranslation from "~/intl/useTranslation";
import {
  StyledWrapper,
  StyledLayout,
  StyledTitle,
  StyledSubtitle,
  StyledList,
  StyledItem,
  StyledItemTitle,
  StyledItemText,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

interface TDeliveryItem {
  title: string;
  text: string;
}

const Delivery: React.FC = () => {
  const { t } = useTranslation();
  const deliveryTitle = t("deliveryTitle");
  const deliverySubtitle = t("deliverySubtitle");
  const deliveryItems = t("deliveryItems");

  return (
    <StyledWrapper id="delivery-section">
      <StyledContainer>
        <StyledLayout>
          <StyledTitle>
            {deliveryTitle}
            <br />
            <StyledSubtitle>{deliverySubtitle}</StyledSubtitle>
          </StyledTitle>
          {deliveryItems && (
            <StyledList>
              {!!deliveryItems.length &&
                deliveryItems.map(
                  (
                    { title, text }: TDeliveryItem,
                    index: number
                  ): React.ReactElement => (
                    <StyledItem data-count={`0${index + 1}`} key={index}>
                      <StyledItemTitle>{title}</StyledItemTitle>
                      <StyledItemText
                        dangerouslySetInnerHTML={{ __html: text }}
                      />
                    </StyledItem>
                  )
                )}
            </StyledList>
          )}
        </StyledLayout>
      </StyledContainer>
    </StyledWrapper>
  );
};

export { Delivery };
