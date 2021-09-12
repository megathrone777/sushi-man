import { styled } from "~/theme";

export const StyledWrapper = styled.div`
  background-color: #da2628;
  border-radius: 50%;
  border: ${({ theme }) => theme.rem(3)} solid white;
  height: ${({ theme }) => theme.rem(70)};
  padding: ${({ theme }) => theme.rem(5)};
  position: fixed;
  right: ${({ theme }) => theme.rem(30)};
  text-align: center;
  top: ${({ theme }) => theme.rem(25)};
  width: ${({ theme }) => theme.rem(70)};
  z-index: 101;
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
  font: ${({ theme }) => `${theme.rem(16)} ${theme.fonts.fontSemiBold}`};
  min-width: ${({ theme }) => theme.rem(25)};
  padding: ${({ theme }) => theme.rem(3)};
  position: absolute;
  right: ${({ theme }) => theme.rem(-5)};
  text-align: center;
  user-select: none;
`;

export const StyledSvgSymbol = styled.svg`
  height: ${({ theme }) => theme.rem(35)};
  width: ${({ theme }) => theme.rem(35)};
`;
