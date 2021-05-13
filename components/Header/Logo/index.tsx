import React from "react";
import Link from "next/link";

import { StyledWrapper, StyledLink, StyledImage } from "./styled";

const Logo: React.FC = () => (
  <StyledWrapper>
    <Link href="/">
      <StyledLink>
        <StyledImage src="/images/logo_img.png" alt="Logo" />
      </StyledLink>
    </Link>
  </StyledWrapper>
);

export default Logo;
