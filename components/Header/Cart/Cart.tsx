import React from "react";
import Link from "next/link";

import { useStore } from "~/store";
import { SvgCartIcon } from "~/icons";
import { StyledWrapper, StyledLink, StyledAmount, StyledIcon } from "./styled";

const Cart: React.FC = () => {
  const { store } = useStore();
  const { cart } = store;

  return (
    <StyledWrapper>
      <Link href="/cart" passHref>
        <StyledLink>
          <StyledIcon>
            <SvgCartIcon />
          </StyledIcon>
        </StyledLink>
      </Link>

      <StyledAmount>{cart.products.length}</StyledAmount>
    </StyledWrapper>
  );
};

export { Cart };
