import React, { useState, useEffect } from "react";

import { Menu, TMenuItem } from "./Menu";
import { Logo } from "./Logo";
import { Contact } from "./Contact";
import { Cart } from "./Cart";
import { useStore } from "~/store";
import {
  StyledHeader,
  StyledLayout,
  StyledContent,
  StyledButton,
  StyledButtonHelper,
} from "./styled";
import { StyledContainer } from "~/components/Layout/styled";

interface TProps {
  menuItems: TMenuItem[];
  inner?: boolean;
}

const Header: React.FC<TProps> = ({ menuItems, inner }) => {
  const { state } = useStore();
  const { shopSettings } = state;
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
            <Menu
              inner={inner}
              menuItems={menuItems}
              closeMenu={() => toggleMenuIsOpened(false)}
            />
            <Contact />
            {!shopSettings.shopIsClosed && <Cart />}
          </StyledContent>
          <StyledButton
            isOpened={menuIsOpened}
            onClick={handleMenu}
            type="button"
          >
            <StyledButtonHelper isLeft isHalf isOpened={menuIsOpened} />
            <StyledButtonHelper isOpened={menuIsOpened} />
            <StyledButtonHelper isRight isHalf isOpened={menuIsOpened} />
          </StyledButton>
        </StyledLayout>
      </StyledContainer>
    </StyledHeader>
  );
};

export { Header };
