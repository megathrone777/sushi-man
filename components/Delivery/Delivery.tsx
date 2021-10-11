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

interface TDeliveryTitle {
  locale: string;
  title: string;
  text: string;
}

interface TDeliveryItem {
  locale: string;
  text: string;
  title: string;
}

export interface TDelivery {
  deliveryTitle: TDeliveryTitle[];
  deliveryItems: TDeliveryItem[];
}

interface TProps extends TDelivery {}

const Delivery: React.FC<TProps> = ({ deliveryItems, deliveryTitle }) => {
  const { locale, t } = useTranslation();
  const items = deliveryItems.filter(
    (item: TDeliveryItem) => item.locale === locale
  );
  const { title, text }: TDeliveryTitle = deliveryTitle.find(
    (item: TDeliveryTitle) => item.locale === locale
  );

  return (
    <StyledWrapper id="delivery-section">
      <StyledContainer>
        <StyledLayout>
          <StyledTitle dangerouslySetInnerHTML={{ __html: title }} />
          <StyledSubtitle dangerouslySetInnerHTML={{ __html: text }} />

          {items && (
            <StyledList>
              {!!items.length &&
                items.map(
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
