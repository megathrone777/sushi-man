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

export const StyledItemName = styled.p`
  color: white;
  font-size: ${({ theme }) => theme.rem(14)};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.rem(25)};
  text-transform: uppercase;
`;

export const StyledItemText = styled.div`
  color: white;
  font-size: ${({ theme }) => theme.rem(16)};
  padding: ${({ theme }) => theme.rem(60)} ${({ theme }) => theme.rem(10)}
    ${({ theme }) => theme.rem(40)};
  line-height: ${({ theme }) => theme.rem(26)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.rem(15)};
    line-height: ${({ theme }) => theme.rem(22)};
  }
`;

export const StyledItemLink = styled.a`
  border-radius: ${({ theme }) => theme.rem(15)};
  display: block;
  height: 100%;
  overflow: hidden;
`;

export const StyledItemImage = styled.img``;
