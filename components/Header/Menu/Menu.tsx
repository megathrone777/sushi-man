import React from "react";

import useTranslation from "~/intl/useTranslation";
import { StyledWrapper, StyledList, StyledItem, StyledLink } from "./styled";

interface TMenuItem {
  anchor: string;
  text: string;
}

interface TProps {
  closeMenu: () => void;
}

const Menu: React.FC<TProps> = ({ closeMenu }) => {
  const { t } = useTranslation();
  const menu = t("menu");

  const handleScroll = (anchor: string): void => {
    const scrolledSection = document.getElementById(anchor);

    scrolledSection &&
      scrolledSection.scrollIntoView({
        behavior: "smooth",
      });

    closeMenu();
  };

  return (
    <StyledWrapper>
      {menu && (
        <StyledList>
          {!!menu.length &&
            menu.map(
              (
                { anchor, text }: TMenuItem,
                index: number
              ): React.ReactElement => (
                <StyledItem key={`${index}-${anchor}`}>
                  <StyledLink onClick={() => handleScroll(anchor)}>
                    {text}
                  </StyledLink>
                </StyledItem>
              )
            )}
        </StyledList>
      )}
    </StyledWrapper>
  );
};

export { Menu };
