import React from "react";
import Link from "next/link";
import Image from 'next/image';

import { StyledContainer } from "~/components/Layout/styled";
import {
  StyledWrapper,
  StyledLayout,
  StyledTitle,
  StyledImageHolder,
  StyledButton,
} from "./styled";

const OrderConfirmed: React.FC = () => (
  <StyledWrapper>
    <StyledContainer>
      <StyledLayout>
        <StyledTitle>Vaše objednávka byla úspěšně přijata</StyledTitle>

        <StyledImageHolder>
          <Image alt="Sushi-man" layout="fill" src="/images/sushi-man_img.jpg" />
        </StyledImageHolder>

        <Link href="/" passHref>
          <StyledButton>Hlavní stránka</StyledButton>
        </Link>
      </StyledLayout>
    </StyledContainer>
  </StyledWrapper>
);

export { OrderConfirmed };
