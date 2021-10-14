import React, { useState } from "react";
import Link from "next/link";

import { Modal } from "~/components";
import { TContactsLink } from "~/components/Modal";
import useTranslation from "~/intl/useTranslation";
import {
  StyledFooter,
  StyledLayout,
  StyledLogo,
  StyledLogoLink,
  StyledLogoImage,
  StyledMenu,
  StyledMenuList,
  StyledMenuItem,
  StyledMenuLink,
  StyledLink,
  StyledCopy,
  StyledCopyText,
  StyledCopyLink,
  StyledText,
  StyledEmail,
  StyledScrollButton,
  StyledChatButton,
  StyledContacts,
  StyledContactsList,
  StyledContactsItem,
  StyledContactsLink,
  StyledItem,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

interface TMenuItem {
  anchor: string;
  text: string;
}

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [modalIsOpened, toggleModalOpened] = useState<boolean>(false);
  const menu = t("menu");
  const allergeny = t("allergeny");
  const allergenyImage = t("allergenyImage");
  const contactsLinks = t("contactsLinks");

  const handleScroll = (anchor: string): void => {
    const scrolledSection = document.getElementById(anchor);

    scrolledSection &&
      scrolledSection.scrollIntoView({
        behavior: "smooth",
      });
  };

  const handleScrollTop = (): void => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  const handleModal = (): void => {
    toggleModalOpened(!modalIsOpened);
  };

  const handleModalClose = (): void => {
    toggleModalOpened(false);
  };

  return (
    <StyledFooter>
      <StyledContainer>
        <StyledLayout>
          <StyledLogo>
            <Link href="/">
              <StyledLogoLink>
                <StyledLogoImage alt="Logo" src="/images/logo_img.png" />
              </StyledLogoLink>
            </Link>
          </StyledLogo>

          {menu && (
            <StyledMenu>
              <StyledMenuList>
                {!!menu.length &&
                  menu.map(
                    (
                      { anchor, text }: TMenuItem,
                      index: number
                    ): React.ReactElement => (
                      <StyledMenuItem key={index}>
                        <StyledMenuLink
                          key={index}
                          onClick={() => handleScroll(anchor)}
                        >
                          {text}
                        </StyledMenuLink>
                      </StyledMenuItem>
                    )
                  )}
              </StyledMenuList>
            </StyledMenu>
          )}

          {contactsLinks && !!contactsLinks.length && (
            <StyledContacts>
              <StyledContactsList>
                {contactsLinks.map(
                  (
                    { type, url }: TContactsLink,
                    index: number
                  ): React.ReactElement => (
                    <StyledContactsItem
                      key={`footer-contact-${index}`}
                      type={type}
                    >
                      <StyledContactsLink href={url} target="_blank" />
                    </StyledContactsItem>
                  )
                )}
              </StyledContactsList>
            </StyledContacts>
          )}

          <StyledItem>
            <StyledLink href="tel:+420792745116">+420 792 745 116</StyledLink>
          </StyledItem>

          <StyledItem>
            <StyledLink href={`/images/${allergenyImage}`} target="_blank">
              {allergeny}
            </StyledLink>
          </StyledItem>

          <StyledItem>
            <Link href="/terms" passHref>
              <StyledLink>Všeobecné obchodní podmínky</StyledLink>
            </Link>
          </StyledItem>

          <StyledItem>
            <Link href="/rules" passHref>
              <StyledLink>Zásady ochrany osobních údajů</StyledLink>
            </Link>
          </StyledItem>

          <StyledText>Provozovna: Husitská 187/60</StyledText>
          <StyledText>MSN form s.r.o., IČ: 099 07 017</StyledText>
          <StyledEmail href="mailto:sushimanprague@gmail.com" target="_blank">
            sushimanprague@gmail.com
          </StyledEmail>
        </StyledLayout>
      </StyledContainer>

      <StyledCopy>
        <StyledCopyText>
          Created by{" "}
          <StyledCopyLink href="http://webrave.cz" target="_blank">
            webrave.cz
          </StyledCopyLink>
        </StyledCopyText>
      </StyledCopy>

      <StyledScrollButton onClick={handleScrollTop} type="button">
        <svg
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 
              9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 
              0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
          />
        </svg>
      </StyledScrollButton>

      <StyledChatButton onClick={handleModal} type="button">
        <svg
          aria-hidden="true"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"
          ></path>
        </svg>
      </StyledChatButton>

      <Modal isOpened={modalIsOpened} close={handleModalClose} />
    </StyledFooter>
  );
};

export { Footer };
