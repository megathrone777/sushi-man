import Image from "next/image";

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
  background: url("/images/products_bg.jpg") center center/auto 100%;
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

export const StyledItemImage = styled(Image)`
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
  color: inherit;
  display: block;
  height: 100%;
  text-decoration: none;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    justify-content: space-between;
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

const StyledAdd = css`
  background-color: ${({ theme }) => theme.colors.red};
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

export const StyledAddButton = styled.button`
  ${StyledAdd};
`;

export const StyledAddLink = styled.a`
  ${StyledAdd};
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
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 50%;
  transform-origin: center top;
  transform: translateY(-50%);
  width: ${({ theme }) => theme.rem(50)};
`;
