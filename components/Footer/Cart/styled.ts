import { styled } from "~/theme";

export const StyledWrapper = styled.div`
  background-color: #da2628;
  border-radius: 50%;
  border: ${({ theme }) => theme.rem(3)} solid white;
  bottom: ${({ theme }) => theme.rem(15)};
  display: none;
  height: ${({ theme }) => theme.rem(70)};
  padding: ${({ theme }) => theme.rem(5)};
  position: fixed;
  left: ${({ theme }) => theme.rem(15)};
  text-align: center;
  transition: all 0.2s ease-in;
  width: ${({ theme }) => theme.rem(70)};
  z-index: 101;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    height: ${({ theme }) => theme.rem(55)};
    width: ${({ theme }) => theme.rem(55)};
  }
`;

export const StyledLink = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const StyledAmount = styled.p`
  background-color: white;
  border-radius: 50%;
  bottom: ${({ theme }) => theme.rem(-5)};
  color: black;
  font: ${({ theme }) => `${theme.rem(16)} ${theme.fonts.fontBold}`};
  line-height: 1.2;
  min-width: ${({ theme }) => theme.rem(25)};
  padding: ${({ theme }) => theme.rem(3)};
  position: absolute;
  right: ${({ theme }) => theme.rem(-5)};
  text-align: center;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    font-size: ${({ theme }) => theme.rem(14)};
    padding: ${({ theme }) => theme.rem(2)};
    min-width: ${({ theme }) => theme.rem(20)};
  }
`;

export const StyledSvgSymbol = styled.svg`
  height: ${({ theme }) => theme.rem(35)};
  width: ${({ theme }) => theme.rem(35)};
`;
