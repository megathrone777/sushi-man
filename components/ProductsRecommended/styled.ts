import { styled } from "~/theme";

export const StyledWrapper = styled.section`
  background: url("/images/products_bg.jpg") center center repeat-y;
  padding: ${({ theme }) => theme.rem(30)} 0 ${({ theme }) => theme.rem(50)};
`;

export const StyledTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.rem(20)};
  font: ${({ theme }) => theme.rem(40)} ${({ theme }) => theme.fonts.fontBold};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.rem(25)};
    margin-bottom: ${({ theme }) => theme.rem(20)};
  }
`;

export const StyledItem = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.rem(15)};
  overflow: hidden;
  padding: 0 0 ${({ theme }) => theme.rem(10)} 0;
  position: relative;
`;

export const StyledItemLayout = styled.div`
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
  }
`;

export const StyledItemImage = styled.img`
  height: 100%;
  object-fit: cover;
  transition: 0.5s;
  width: 100%;
`;

export const StyledItemImageHolder = styled.div`
  height: ${({ theme }) => theme.rem(340)};
  margin-bottom: ${({ theme }) => theme.rem(20)};
  overflow: hidden;
  text-align: center;
  transform: scale(1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 1 ${({ theme }) => theme.rem(230)};
    margin-bottom: 0;
    min-width: ${({ theme }) => theme.rem(230)};
  }

  &:hover ${StyledItemImage} {
    transform: scale(1.05);

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      transform: scale(1);
    }
  }
`;

export const StyledItemLink = styled.a`
  display: block;
  height: 100%;
`;

export const StyledItemContent = styled.div`
  min-height: ${({ theme }) => theme.rem(180)};
`;

export const StyledItemTitle = styled.div`
  font: ${({ theme }) => theme.rem(20)} ${({ theme }) => theme.fonts.fontBold};
  margin-bottom: ${({ theme }) => theme.rem(7)};
  min-height: ${({ theme }) => theme.rem(48)};
  padding: 0 ${({ theme }) => theme.rem(20)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.rem(10)};
    line-height: ${({ theme }) => theme.rem(50)};
  }
`;

export const StyledItemFooter = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  height: ${({ theme }) => theme.rem(47)};
  justify-content: space-between;
  left: 0;
  position: absolute;
  right: 0;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-start;
  }
`;

export const StyledItemPrice = styled.div`
  font: ${({ theme }) => `${theme.rem(25)} ${theme.fonts.fontSemiBold}`};
  padding-left: ${({ theme }) => theme.rem(20)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: ${({ theme }) => theme.rem(10)};
  }
`;

export const StyledItemDesc = styled.div`
  color: #707171;
  font-size: ${({ theme }) => theme.rem(14)};
  margin-bottom: ${({ theme }) => theme.rem(3)};
  padding: 0 ${({ theme }) => theme.rem(40)};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.rem(20)};
  }

  &::before {
    background: #707171;
    border-radius: 50%;
    content: "";
    display: block;
    height: ${({ theme }) => theme.rem(7)};
    left: ${({ theme }) => theme.rem(20)};
    position: absolute;
    top: ${({ theme }) => theme.rem(8)};
    width: ${({ theme }) => theme.rem(7)};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      left: ${({ theme }) => theme.rem(9)};
      top: ${({ theme }) => theme.rem(6)};
    }
  }
`;

export const StyledItemText = styled.p``;

export const StyledSVGSymbol = styled.svg``;
export const StyledPathSymbol = styled.path``;

export const StyledItemButton = styled.button`
  background-color: #da2628;
  border: none;
  color: white;
  cursor: pointer;
  display: inline-block;
  height: ${({ theme }) => theme.rem(45)};
  min-width: ${({ theme }) => theme.rem(64)};
  padding: 0 ${({ theme }) => theme.rem(20)};
  text-align: center;
  text-decoration: none;
  transition: all 0.1s ease-in;
  width: ${({ theme }) => theme.rem(64)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: ${({ theme }) => theme.rem(20)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    height: ${({ theme }) => theme.rem(50)};
    min-width: ${({ theme }) => theme.rem(80)};
  }

  &:focus {
    outline: none;
  }

  ${StyledSVGSymbol} {
    max-width: ${({ theme }) => theme.rem(24)};
  }

  &:hover {
    min-width: ${({ theme }) => theme.rem(85)};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
      min-width: ${({ theme }) => theme.rem(90)};
    }
  }
`;
