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
    </StyledFooter>
  );
};

export { Footer };
