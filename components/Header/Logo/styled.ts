import { styled } from "~/theme";

export const StyledWrapper = styled.div`
  margin-right: ${({ theme }) => theme.rem(90)};
  max-width: ${({ theme }) => theme.rem(80)};
  min-width: ${({ theme }) => theme.rem(80)};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-right: ${({ theme }) => theme.rem(30)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: relative;
    z-index: 40;
  }
`;

export const StyledLink = styled.a`
  cursor: pointer;
  display: block;
  height: 100%;
`;

export const StyledImage = styled.img`
  height: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: ${({ theme }) => theme.rem(80)};
  }
`;
