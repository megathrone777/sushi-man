import React from "react";

import useTranslation from "~/intl/useTranslation";
import {
  StyledWrapper,
  StyledLayout,
  StyledTitle,
  StyledLinks,
  StyledList,
  StyledItem,
  StyledLink,
  StyledTime
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

interface TContactsLink {
  url: string;
  type: string;
}

const Contacts: React.FC = () => {
  const { t } = useTranslation();
  const contactsTitle = t("contactsTitle");
  const contactsLinks = t("contactsLinks");
  const contactsTime = t("contactsTime");

  return (
    <StyledWrapper id="contacts-section">
      <StyledContainer>
        <StyledLayout>
          <StyledTitle>{contactsTitle}</StyledTitle>
          <StyledTime dangerouslySetInnerHTML={{ __html: contactsTime }} />
          {contactsLinks && (
            <StyledLinks>
              <StyledList>
                {!!contactsLinks.length &&
                  contactsLinks.map(
                    (
                      { url, type }: TContactsLink,
                      index: number
                    ): React.ReactElement => (
                      <StyledItem key={index} type={type}>
                        <StyledLink href={url} target="_blank" />
                      </StyledItem>
                    )
                  )}
              </StyledList>
            </StyledLinks>
          )}
        </StyledLayout>
      </StyledContainer>
    </StyledWrapper>
  );
};

export { Contacts };
