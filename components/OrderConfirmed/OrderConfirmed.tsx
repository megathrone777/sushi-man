import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { useStore } from "~/store";
import { TActionTypes } from "~/store/actions";
import { StyledContainer } from "~/components/Layout/styled";
import {
  StyledWrapper,
  StyledLayout,
  StyledTitle,
  StyledImageHolder,
  StyledButton,
} from "./styled";

const OrderConfirmed: React.FC = () => {
  const { dispatch } = useStore();

  useEffect((): void => {
    dispatch({
      payload: {},
      type: TActionTypes.CLEAR_STORE,
    });
  }, []);

  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledLayout>
          <StyledTitle>Vaše objednávka byla úspěšně přijata</StyledTitle>

          <StyledImageHolder>
            <Image
              alt="Sushi-man"
              layout="fill"
              src="/images/sushi-man_img.jpg"
            />
          </StyledImageHolder>

          <Link href="/" passHref>
            <StyledButton>Hlavní stránka</StyledButton>
          </Link>
        </StyledLayout>
      </StyledContainer>
    </StyledWrapper>
  );
};

export { OrderConfirmed };
