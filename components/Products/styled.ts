import { styled } from "~/theme";

export const StyledWrapper = styled.section`
  background: url("/images/products_bg.jpg") center center/cover no-repeat;
  padding: ${({ theme }) => theme.rem(60)} 0;
`;

export const StyledTitle = styled.h2`
  font: ${({ theme }) => theme.rem(48)} ${({ theme }) => theme.fonts.fontBold};
  margin-bottom: ${({ theme }) => theme.rem(15)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.rem(25)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-left: ${({ theme }) => theme.rem(10)};
    padding-right: ${({ theme }) => theme.rem(10)};
  }
`;

export const StyledLayout = styled.div`
  margin: 0 auto ${({ theme }) => theme.rem(40)};
  max-width: ${({ theme }) => theme.rem(1200)};
`;

export const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: ${({ theme }) => theme.rem(-10)};
  margin-right: ${({ theme }) => theme.rem(-10)};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-left: ${({ theme }) => theme.rem(-5)};
    margin-right: ${({ theme }) => theme.rem(-5)};
  }
`;

export const StyledItem = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.rem(15)};
  flex: 0 1 calc(25% - ${({ theme }) => theme.rem(20)});
  margin-bottom: ${({ theme }) => theme.rem(20)};
  margin-left: ${({ theme }) => theme.rem(10)};
  margin-right: ${({ theme }) => theme.rem(10)};
  max-width: calc(25% - ${({ theme }) => theme.rem(20)});
  overflow: hidden;
  padding: 0 0 ${({ theme }) => theme.rem(10)} 0;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: 0 1 calc(25% - ${({ theme }) => theme.rem(10)});
    max-width: calc(25% - ${({ theme }) => theme.rem(10)});
    margin-bottom: ${({ theme }) => theme.rem(10)};
    margin-left: ${({ theme }) => theme.rem(5)};
    margin-right: ${({ theme }) => theme.rem(5)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex: 0 1 100%;
    max-width: 100%;
    margin-bottom: ${({ theme }) => theme.rem(10)};
    margin-left: ${({ theme }) => theme.rem(5)};
    margin-right: ${({ theme }) => theme.rem(5)};
    padding-bottom: ${({ theme }) => theme.rem(20)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 0 1 calc(50% - ${({ theme }) => theme.rem(10)});
    margin-bottom: ${({ theme }) => theme.rem(10)};
    max-width: calc(50% - ${({ theme }) => theme.rem(10)});
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    flex: 0 1 100%;
    margin-left: 0;
    margin-right: 0;
    max-width: 100%;
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
    margin-bottom: ${({ theme }) => theme.rem(10)};
  }

  &:hover ${StyledItemImage} {
    transform: scale(1.05);

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      transform: scale(1);
    }
  }
`;

export const StyledItemContent = styled.div`
  min-height: ${({ theme }) => theme.rem(115)};
`;

export const StyledItemTitle = styled.div`
  font: ${({ theme }) => theme.rem(20)} ${({ theme }) => theme.fonts.fontBold};
  margin-bottom: ${({ theme }) => theme.rem(7)};
  min-height: ${({ theme }) => theme.rem(48)};
  padding: 0 ${({ theme }) => theme.rem(20)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.rem(10)};
  }
`;

export const StyledItemFooter = styled.div`
  align-items: center;
  bottom: ${({ theme }) => theme.rem(15)};
  display: flex;
  height: ${({ theme }) => theme.rem(47)};
  justify-content: space-between;
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

export const StyledScroller = styled.button`
  background: url("/images/products_scroller_bg.png") center center/100%
    no-repeat;
  border: none;
  cursor: pointer;
  display: block;
  height: ${({ theme }) => theme.rem(45)};
  margin-left: auto;
  margin-right: auto;
  width: ${({ theme }) => theme.rem(55)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }

  &:focus {
    outline: none;
  }
`;

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

export const StyledSlider = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    display: block;
  }
`;
