import React from "react";
import Link from "next/link";
import Image from "next/image";

import { StyledWrapper, StyledLink } from "./styled";

const Logo: React.FC = () => (
  <StyledWrapper>
    <div
      style={{
        display: "flex",
        position: "fixed",
        justifyContent: "center",
        zIndex: 200,
        width: '100%',
        left: 0,
        right: 0
      }}
    >
      <span
        style={{
          fontSize: "200px",
          zIndex: 200,
        }}
      >
        &#129314;
      </span>
      <span
        style={{
          fontSize: "200px",
        }}
      >
        &#129326;
      </span>
    </div>
    <Link href="/" passHref>
      <StyledLink>
        <Image alt="Logo" layout="fill" src="/images/logo_img.png" />
      </StyledLink>
    </Link>
  </StyledWrapper>
);

export { Logo };
