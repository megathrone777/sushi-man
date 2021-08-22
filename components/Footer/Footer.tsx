import React from "react";
import Link from "next/link";

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
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

interface TMenuItem {
  anchor: string;
  text: string;
}

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const menu = t("menu");
  const allergeny = t("allergeny");
  const allergenyImage = t("allergenyImage");

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

          <StyledLink href={`/images/${allergenyImage}`} target="_blank">
            {allergeny}
          </StyledLink>
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
    </StyledFooter>
  );
};

export { Footer };
