import { styled } from "~/theme";
import { StyledContainer } from "~/components/Layout/styled";

export const StyledWrapper = styled.section`
  background-color: #eaeaed;
  padding: ${({ theme }) => theme.rem(60)} 0;

  ${StyledContainer} {
    @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
      padding-left: ${({ theme }) => theme.rem(20)};
      padding-right: ${({ theme }) => theme.rem(20)};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding-left: ${({ theme }) => theme.rem(10)};
      padding-right: ${({ theme }) => theme.rem(10)};
    }
  }
`;

export const StyledLayout = styled.div`
  margin: 0 auto ${({ theme }) => theme.rem(40)};
  max-width: ${({ theme }) => theme.rem(1200)};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 0;
  }
`;

export const StyledTitle = styled.h2`
  font: ${({ theme }) => theme.rem(40)} ${({ theme }) => theme.fonts.fontBlack};
  letter-spacing: ${({ theme }) => theme.rem(1)};
  margin-bottom: ${({ theme }) => theme.rem(20)};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.rem(28)};
  }
`;

export const StyledItem = styled.div`
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    min-height: ${({ theme }) => theme.rem(230)};
  }

  &:focus {
    outline: none;
  }
`;

export const StyledItemLink = styled.a`
  border-radius: ${({ theme }) => theme.rem(15)};
  display: block;
  height: 100%;
  overflow: hidden;
`;

export const StyledButton = styled.button`
  background-color: #da2628;
  border: none;
  color: white;
  cursor: pointer;
  display: inline-block;
  font: ${({ theme }) => theme.rem(22)} ${({ theme }) => theme.fonts.fontSemiBold};
  height: ${({ theme }) => theme.rem(55)};
  line-height: ${({ theme }) => theme.rem(55)};
  min-width: ${({ theme }) => theme.rem(190)};
  margin-top: ${({ theme }) => theme.rem(40)};
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
    top: ${({ theme }) => theme.rem(100)};
  }

  &:hover {
    box-shadow: 0px 0px ${({ theme }) => theme.rem(14)} 0px
      rgba(218, 38, 40, 0.75);
  }
`;

export const StyledItemImage = styled.img``;