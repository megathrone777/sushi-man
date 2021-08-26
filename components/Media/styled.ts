import { styled } from "~/theme";

export const StyledWrapper = styled.section`
  border-top: ${({ theme }) => theme.rem(10)} solid #da2628;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: auto;
  }
`;

export const StyledImage = styled.img`
  height: 100%;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: auto;
  }
`;
