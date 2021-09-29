import React from "react";
import { usePersistedContext } from "react-persist-context";

import { TSchedule } from "~/store";
import useTranslation from "~/intl/useTranslation";
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
  const { state } = usePersistedContext();
  const contactsLinks = t("contactsLinks");
  const content: TSchedule = state.schedule[`schedule_${locale}`];

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 
            6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
              fill="currentColor"
            />
          </svg>
        </StyledClose>
      </StyledLayout>
    </StyledWrapper>
  );
};

export { Modal };
