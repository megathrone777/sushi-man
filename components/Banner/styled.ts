import { css, styled } from "~/theme";

export const StyledWrapper = styled.section<{ inner?: boolean }>`
  position: relative;
  z-index: 2;

  ${({ inner }) =>
    inner &&
    css`
      border-bottom: ${({ theme }) => theme.rem(4)} solid #da2628;
      height: ${({ theme }) => theme.rem(400)};
      overflow: hidden;

      @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        height: auto;
      }
    `}
`;

export const StyledImage = styled.img<{ inner?: boolean }>`
  display: block;
  width: 100%;

  ${({ inner }) =>
    inner &&
    css`
      position: relative;
      top: ${({ theme }) => theme.rem(-60)};

      @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        top: 0;
      }
    `}
`;

export const StyledLayout = styled.div<{ inner?: boolean }>`
  left: 0;
  position: absolute;
  right: 0;
  top: ${({ theme }) => theme.rem(170)};

  ${({ inner }) =>
    inner &&
    css`
      top: ${({ theme }) => theme.rem(140)};
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    top: 30%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background-color: #da2629;
    position: static;
  }
`;

export const StyledTitle = styled.h1`
  font: ${({ theme }) => `${theme.rem(42)} ${theme.fonts.fontBold}`};
  line-height: 1.4;
  margin-bottom: ${({ theme }) => theme.rem(15)};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.rem(38)};
    line-height: 1.2;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.rem(28)};
    max-width: 51%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    color: white;
    display: none;
    font-size: ${({ theme }) => theme.rem(22)};
    max-width: 100%;
    text-align: center;
  }
`;

export const StyledText = styled.p`
  font-size: ${({ theme }) => theme.rem(18)};
  font-style: italic;
  line-height: 1.4;
  margin-bottom: ${({ theme }) => theme.rem(40)};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: ${({ theme }) => theme.rem(25)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
    font-size: ${({ theme }) => theme.rem(16)};
    margin-bottom: ${({ theme }) => theme.rem(15)};
    max-width: 40%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    color: white;
    font-size: ${({ theme }) => theme.rem(16)};
    margin-bottom: 0;
    max-width: 100%;
    text-align: center;
  }
`;

export const StyledButton = styled.a`
  background-color: #da2628;
  border-radius: ${({ theme }) => theme.rem(5)};
  color: white;
  display: inline-block;
  font: ${({ theme }) => `${theme.rem(22)} ${theme.fonts.fontMedium}`};
  height: ${({ theme }) => theme.rem(55)};
  line-height: ${({ theme }) => theme.rem(55)};
  min-width: ${({ theme }) => theme.rem(190)};
  padding: 0 ${({ theme }) => theme.rem(15)};
  text-align: center;
  text-decoration: none;
  transition: 0.2s ease-in;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: ${({ theme }) => theme.rem(45)};
    line-height: ${({ theme }) => theme.rem(45)};
    font-size: ${({ theme }) => theme.rem(16)};
    min-width: ${({ theme }) => theme.rem(140)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: ${({ theme }) => theme.rem(37)};
    line-height: ${({ theme }) => theme.rem(37)};
    min-width: ${({ theme }) => theme.rem(110)};
    position: absolute;
    top: 40%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    bottom: ${({ theme }) => theme.rem(20)};
    top: inherit;
  }

  &:hover {
    box-shadow: 0px 0px ${({ theme }) => theme.rem(14)} 0px
      rgba(218, 38, 40, 0.75);
  }
`;
