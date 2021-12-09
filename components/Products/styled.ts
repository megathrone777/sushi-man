import { TabList, Tab, TabPanel, Tabs } from "react-tabs";

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
  min-height: ${({ theme }) => theme.rem(300)};
  padding: ${({ theme }) => theme.rem(60)} 0 ${({ theme }) => theme.rem(30)};
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

export const StyledTabs = styled(Tabs)`
  margin-bottom: ${({ theme }) => theme.rem(20)};
  min-height: ${({ theme }) => theme.rem(440)};
`;

export const StyledPanel = styled(TabPanel)``;

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
  iscollapsed: boolean;
  isroll: boolean;
  isset: boolean;
  issalat: boolean;
  ispoke: boolean;
  isdrink: boolean;
}>`
  background-position-x: ${({ theme }) => theme.rem(-1)};
  background-repeat: no-repeat;
  background-size: calc(100% + ${({ theme }) => theme.rem(2)}) auto;
  border-radius: ${({ theme }) => theme.rem(15)};
  color: white;
  cursor: pointer;
  flex: 0 1
    calc(
      ${({ iscollapsed }) => (iscollapsed ? "20%" : "33.3333%")} -
        ${({ theme }) => theme.rem(20)}
    );
  font: ${({ theme }) => `${theme.rem(26)} ${theme.fonts.fontBold}`};
  height: ${({ iscollapsed, theme }) =>
    iscollapsed ? theme.rem(70) : theme.rem(200)};
  margin: ${({ theme }) => `0 ${theme.rem(10)} ${theme.rem(20)}`};
  opacity: ${({ iscollapsed }) => (iscollapsed ? "0.7" : 1)};
  overflow: hidden;
  padding: ${({ theme }) => `${theme.rem(20)} 0  0 ${theme.rem(20)}`};
  transition: background-position 0.5s, background-size 0.5s, height 0.5s;

  &.react-tabs__tab--selected {
    ${({ iscollapsed }) =>
      iscollapsed &&
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

  ${({ iscollapsed, isroll }) =>
    isroll &&
    css`
      background-image: url("/images/rolls_bg.jpg");
      background-position-y: ${({ theme }) =>
        iscollapsed ? theme.rem(-200) : theme.rem(-280)};
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

export const StyledLoader = styled.span<{ iscollapsed: boolean }>`
  align-items: center;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-name: ${rotate};
  animation-timing-function: linear;
  color: ${({ theme }) => theme.colors.red};
  display: flex;
  height: ${({ theme }) => theme.rem(50)};
  justify-content: center;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: ${({ iscollapsed, theme }) =>
    iscollapsed ? theme.rem(300) : theme.rem(350)};
  transform-origin: center top;
  width: ${({ theme }) => theme.rem(50)};
`;
