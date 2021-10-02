import { styled } from "~/theme";

export const StyledWrapper = styled.div`
  background-color: #da2628;
  border-radius: 50%;
  border: ${({ theme }) => theme.rem(3)} solid white;
  display: flex;
  height: ${({ theme }) => theme.rem(70)};
  margin-left: ${({ theme }) => theme.rem(70)};
  padding: ${({ theme }) => theme.rem(5)};
  position: fixed;
  right: ${({ theme }) => theme.rem(30)};
  top: ${({ theme }) => theme.rem(25)};
  text-align: center;
  transition: all 0.2s ease-in;
  width: ${({ theme }) => theme.rem(70)};
  z-index: 101;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const StyledLink = styled.a`
  align-items: center;
  color: white;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const StyledIcon = styled.i`
  display: block;
  height: ${({ theme }) => theme.rem(35)};
  width: ${({ theme }) => theme.rem(35)};
`;

export const StyledAmount = styled.div`
  background-color: white;
  border-radius: 50%;
  bottom: ${({ theme }) => theme.rem(-5)};
  color: black;
  font: ${({ theme }) => `${theme.rem(16)} ${theme.fonts.fontBold}`};
  min-width: ${({ theme }) => theme.rem(25)};
  padding: ${({ theme }) => theme.rem(3)};
  position: absolute;
  right: ${({ theme }) => theme.rem(-5)};
  text-align: center;
  user-select: none;
`;
