import { Tabs, TabList, Tab } from "react-tabs";

import { css, keyframes, styled } from "~/theme";

const rotate = keyframes`
  from {
    transform: rotate(0deg) translateY(-50%);
  }

  to {
    transform: rotate(360deg) translateY(-50%);
  }
`;

export const StyledWrapper = styled.section`
  background-image: url("/images/products_bg.jpg");
  background-size: 33.3333% auto;
  padding: ${({ theme }) => theme.rem(60)} 0;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: ${({ theme }) => theme.rem(30)};
  }
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

export const StyledTabsList = styled(TabList)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.rem(20)};
  margin-left: ${({ theme }) => theme.rem(-10)};
  margin-right: ${({ theme }) => theme.rem(-10)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: ${({ theme }) => theme.rem(-5)};
    margin-right: ${({ theme }) => theme.rem(-5)};
  }
`;

export const StyledTab = styled(Tab)<{
  isCollapsed: boolean;
  isroll?: boolean;
  isset?: boolean;
  issalat?: boolean;
  ispoke?: boolean;
  isdrink?: boolean;
}>`
  background-position-x: ${({ theme }) => theme.rem(-1)};
  background-repeat: no-repeat;
  background-size: calc(100% + ${({ theme }) => theme.rem(2)}) auto;
  border-radius: ${({ theme }) => theme.rem(15)};
  color: white;
  cursor: pointer;
  flex: 0 1
    calc(
      ${({ isCollapsed }) => (isCollapsed ? "20%" : "33.3333%")} -
        ${({ theme }) => theme.rem(20)}
    );
  font: ${({ theme }) => `${theme.rem(26)} ${theme.fonts.fontBold}`};
  height: ${({ isCollapsed, theme }) =>
    isCollapsed ? theme.rem(70) : theme.rem(200)};
  margin: ${({ theme }) => `0 ${theme.rem(10)} ${theme.rem(20)}`};
  opacity: ${({ isCollapsed }) => (isCollapsed ? "0.7" : 1)};
  padding: ${({ theme }) => `${theme.rem(20)} 0  0 ${theme.rem(20)}`};
  transition: background-position 0.5s, background-size 0.5s, height 0.5s;

  &.react-tabs__tab--selected {
    ${({ isCollapsed }) =>
      isCollapsed &&
      css`
        opacity: 1;
      `}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 1 calc(50% - ${({ theme }) => theme.rem(10)});
    margin: ${({ theme }) => `0 ${theme.rem(5)} ${theme.rem(10)}`};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 0 1 calc(100% - ${({ theme }) => theme.rem(10)});
  }

  &:hover {
    background-position-x: ${({ theme }) => theme.rem(-10)};
    background-size: calc(100% + ${({ theme }) => theme.rem(10)}) auto;
  }

  ${({ isCollapsed, isroll }) =>
    isroll &&
    css`
      background-image: url("/images/rolls_bg.jpg");
      background-position-y: ${({ theme }) =>
        isCollapsed ? theme.rem(-200) : theme.rem(-280)};
    `}

  ${({ issalat }) =>
    issalat &&
    css`
      background-image: url("/images/salats_bg.jpg");
      background-position-y: ${({ theme }) => theme.rem(-220)};
    `}


  ${({ isset }) =>
    isset &&
    css`
      background-image: url("/images/sets_bg.jpg");
      background-position-y: ${({ theme }) => theme.rem(-140)};
    `}

  ${({ ispoke }) =>
    ispoke &&
    css`
      background-image: url("/images/poke_bg.jpg");
      background-position-y: ${({ theme }) => theme.rem(-70)};
    `}

  ${({ isdrink }) =>
    isdrink &&
    css`
      background-image: url("/images/drinks_bg.jpg");
      background-position-y: ${({ theme }) => theme.rem(-180)};
    `}
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
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
    margin-bottom: ${({ theme }) => theme.rem(10)};
    margin-left: ${({ theme }) => theme.rem(5)};
    margin-right: ${({ theme }) => theme.rem(5)};
    max-width: calc(25% - ${({ theme }) => theme.rem(10)});
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 1 calc(50% - ${({ theme }) => theme.rem(10)});
    margin-bottom: ${({ theme }) => theme.rem(10)};
    margin-left: ${({ theme }) => theme.rem(5)};
    margin-right: ${({ theme }) => theme.rem(5)};
    max-width: calc(50% - ${({ theme }) => theme.rem(10)});
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.rem(10)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    display: flex;
    flex: 0 1 calc(100% - ${({ theme }) => theme.rem(10)});
    max-width: 100%;
    padding-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileXs}) {
    flex-direction: column;
  }
`;

export const StyledItemLayout = styled.div`
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileXs}) {
    padding-bottom: ${({ theme }) => theme.rem(60)};
  }
`;

export const StyledItemImage = styled.img`
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    border-top-left-radius: ${({ theme }) => theme.rem(15)};
    border-bottom-left-radius: ${({ theme }) => theme.rem(15)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileXs}) {
    border-bottom-left-radius: 0;
  }
`;

export const StyledItemImageHolder = styled.div`
  height: ${({ theme }) => theme.rem(340)};
  margin-bottom: ${({ theme }) => theme.rem(20)};
  overflow: hidden;
  position: relative;
  text-align: center;
  transform: scale(1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 1 ${({ theme }) => theme.rem(230)};
    margin-bottom: 0;
    min-width: ${({ theme }) => theme.rem(230)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    flex: 0 1 ${({ theme }) => theme.rem(180)};
    height: ${({ theme }) => theme.rem(250)};
    margin-bottom: 0;
    min-width: ${({ theme }) => theme.rem(180)};
  }

  &:hover ${StyledItemImage} {
    transform: scale(1.05);

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      transform: scale(1);
    }
  }
`;

export const StyledItemLink = styled.a`
  color: inherit;
  display: block;
  height: 100%;
  text-decoration: none;
`;

export const StyledItemContent = styled.div`
  min-height: ${({ theme }) => theme.rem(115)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: ${({ theme }) => theme.rem(140)};
  }
`;

export const StyledItemTitle = styled.div`
  font: ${({ theme }) => theme.rem(22)} ${({ theme }) => theme.fonts.fontBold};
  margin-bottom: ${({ theme }) => theme.rem(7)};
  padding: 0 ${({ theme }) => theme.rem(20)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.rem(10)};
    line-height: ${({ theme }) => theme.rem(50)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.rem(9)};
    margin-top: ${({ theme }) => theme.rem(9)};
  }
`;

export const StyledItemFooter = styled.div`
  align-items: center;
  display: flex;
  height: ${({ theme }) => theme.rem(47)};
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    bottom: 0;
    justify-content: space-between;
    left: 0;
    margin-top: ${({ theme }) => theme.rem(5)};
    position: absolute;
    right: 0;
  }
`;

export const StyledItemPrice = styled.div`
  font: ${({ theme }) => `${theme.rem(25)} ${theme.fonts.fontMedium}`};
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

export const StyledItemButton = styled.button`
  background-color: #da2628;
  border: none;
  border-bottom-left-radius: ${({ theme }) => theme.rem(5)};
  border-top-left-radius: ${({ theme }) => theme.rem(5)};
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
    border-radius: ${({ theme }) => theme.rem(5)};
    margin-left: ${({ theme }) => theme.rem(20)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    height: ${({ theme }) => theme.rem(50)};
    min-width: ${({ theme }) => theme.rem(80)};
  }

  &:focus {
    outline: none;
  }

  &:hover {
    min-width: ${({ theme }) => theme.rem(85)};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
      min-width: ${({ theme }) => theme.rem(90)};
    }
  }
`;

export const StyledLoader = styled.span`
  align-items: center;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-name: ${rotate};
  animation-timing-function: linear;
  color: ${({ theme }) => theme.colors.red};
  display: flex;
  height: ${({ theme }) => theme.rem(50)};
  justify-content: center;
  margin: auto;
  transform-origin: center top;
  width: ${({ theme }) => theme.rem(50)};
`;
