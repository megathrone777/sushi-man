import React from "react";
import Link from "next/link";

import { StyledWrapper, StyledList, StyledItem, StyledLink } from "./styled";

export interface TMenuItem {
  anchor: string;
  text: string;
}

interface TProps {
  closeMenu: () => void;
  mainMenuItems: TMenuItem[];
  innerMenuItems: TMenuItem[];
  inner?: boolean;
}

const Menu: React.FC<TProps> = ({ closeMenu, mainMenuItems, innerMenuItems, inner }) => {
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
      {inner ? (
        <>
          {innerMenuItems && (
            <StyledList>
              {!!innerMenuItems.length &&
                innerMenuItems.map(
                  (
                    { anchor, text }: TMenuItem,
                    index: number
                  ): React.ReactElement => (
                    <StyledItem key={`${index}-${anchor}`}>
                      <Link href={anchor} passHref>
                        <StyledLink>{text}</StyledLink>
                      </Link>
                    </StyledItem>
                  )
                )}
            </StyledList>
          )}
        </>
      ) : (
        <>
          {mainMenuItems && (
            <StyledList>
              {!!mainMenuItems.length &&
                mainMenuItems.map(
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
        </>
      )}
    </StyledWrapper>
  );
};

export { Menu };
