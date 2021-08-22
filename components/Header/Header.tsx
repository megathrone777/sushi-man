import React, { useState, useEffect } from "react";

import { Menu } from "./Menu";
import { Logo } from "./Logo";
import { Contact } from "./Contact";
import {
  StyledHeader,
  StyledLayout,
  StyledContent,
  StyledButton,
  StyledButtonHelper,
} from "./styled";
import { LocaleSwitcher } from "~/components/LocaleSwitcher";
import { StyledContainer } from "~/components/Layout/styled";

const Header = (): JSX.Element => {
  const [menuIsOpened, toggleMenuIsOpened] = useState<boolean>(false);

  const handleMenu = (): void => {
    toggleMenuIsOpened(!menuIsOpened);
  };

  useEffect((): void => {
    if (menuIsOpened) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "visible";
  }, [menuIsOpened]);

  return (
    <StyledHeader>
      <StyledContainer>
        <StyledLayout>
          <Logo />
          <StyledContent isOpened={menuIsOpened}>
            <Menu closeMenu={() => toggleMenuIsOpened(false)} />
            <Contact />
            <LocaleSwitcher />
          </StyledContent>
          <StyledButton
            isOpened={menuIsOpened}
            onClick={handleMenu}
            type="button"
          >
            <StyledButtonHelper />
          </StyledButton>
        </StyledLayout>
      </StyledContainer>
    </StyledHeader>
  );
};

export { Header };
