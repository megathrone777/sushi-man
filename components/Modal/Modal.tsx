import React from "react";


import { TSchedule, useStore } from "~/store";
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

const Modal: React.FC<TProps> = ({ close, isOpened }) => {
  const { locale, t } = useTranslation();
  const { state } = useStore();
  const contactsLinks = t("contactsLinks");
  const content: TSchedule = state.schedule[`schedule_${locale}`];

  console.log(content);

  const handleClose = (): void => {
    close();
  };

  return (
    <StyledWrapper>
      <StyledBackground onClick={handleClose} isOpened={isOpened} />
      <StyledLayout isOpened={isOpened}>
        <StyledContainer>
          <StyledTitle dangerouslySetInnerHTML={{ __html: content.title }} />
          <StyledTime dangerouslySetInnerHTML={{ __html: content.schedule }} />

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

export { Modal };
