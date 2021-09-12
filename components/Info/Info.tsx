import React from "react";

import useTranslation from "~/intl/useTranslation";
import {
  StyledWrapper,
  StyledLayout,
  StyledClose,
  StyledBackground,
  StyledText,
  StyledContent,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

export interface TInfo {
  locale: string;
  isActive?: boolean;
  text: string;
}

interface TProps {
  isOpened: boolean;
  close: () => void;
  modalContent: TInfo[];
}

const Info: React.FC<TProps> = ({ close, modalContent, isOpened }) => {
  const { locale } = useTranslation();
  const content: TInfo =
    !!modalContent.length &&
    modalContent.find((item: TInfo) => item.locale === locale);

  const handleClose = (): void => {
    close();
  };

  return (
    <StyledWrapper>
      <StyledBackground onClick={handleClose} isOpened={isOpened} />
      <StyledLayout isOpened={isOpened}>
        <StyledContent>
          <StyledText dangerouslySetInnerHTML={{ __html: content.text }} />
        </StyledContent>

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

export { Info };
