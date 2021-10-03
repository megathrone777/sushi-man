import React from "react";

import useTranslation from "~/intl/useTranslation";
import { SvgCloseIcon } from "~/icons";
import {
  StyledWrapper,
  StyledLayout,
  StyledTitle,
  StyledLinks,
  StyledList,
  StyledItem,
  StyledLink,
  StyledClose,
  StyledBackground,
  StyledTime,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

export interface TContactsLink {
  type: string;
  url: string;
}

interface TProps {
  isOpened: boolean;
  close: () => void;
}

const ShopModal: React.FC<TProps> = ({ close, isOpened }) => {
  const { t } = useTranslation();
  const contactsLinks = t("contactsLinks");

  const handleClose = (): void => {
    close();
  };

  return (
    <StyledWrapper>
      <StyledBackground onClick={handleClose} isOpened={isOpened} />
      <StyledLayout isOpened={isOpened}>
        <StyledContainer>
          <StyledTitle>Teď objednat není možné</StyledTitle>
          <StyledTime>
            Vážený přátele, dneska jsme dosáhli maximálního počtu objednávek ve
            frontě, proto prosím Vás zkusit objednat později.
          </StyledTime>

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
        </StyledContainer>

        <StyledClose onClick={handleClose} type="button">
          <SvgCloseIcon />
        </StyledClose>
      </StyledLayout>
    </StyledWrapper>
  );
};

export { ShopModal };
