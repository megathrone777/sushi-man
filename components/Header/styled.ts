import { css, styled } from "~/theme";

export const StyledHeader = styled.header`
  height: ${({ theme }) => theme.rem(125)};
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: ${({ theme }) => theme.rem(100)};
  }
`;

export const StyledLayout = styled.div`
  align-items: center;
  display: flex;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: space-between;
  }
`;

export const StyledContent = styled(StyledLayout)<{
  isOpened: boolean;
}>`
  flex-grow: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    background: #da2629;
    bottom: 0;
    flex-direction: column-reverse;
    left: 0;
    opacity: 0;
    position: fixed;
    right: 0;
    justify-content: center;
    top: 0;
    transition: visibility 0.2s ease-in, opacity 0.2s ease-in;
    visibility: hidden;
    z-index: 10;

    ${({ isOpened }) =>
      isOpened &&
      css`
        opacity: 1;
        visibility: visible;
      `};
  }
`;

export const StyledButtonHelper = styled.span`
  background-color: #e6e6e6;
  border-radius: ${({ theme }) => theme.rem(4)};
  height: ${({ theme }) => theme.rem(4)};
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition-duration: 0.15s;
  transition-property: transform;
  transition-timing-function: ease;
  width: ${({ theme }) => theme.rem(40)};

  &:focus {
    outline: none;
  }

  &::before,
  &::after {
    background-color: #e6e6e6;
    border-radius: ${({ theme }) => theme.rem(4)};
    content: "";
    height: ${({ theme }) => theme.rem(4)};
    left: 0;
    position: absolute;
    transition-duration: 0.15s;
    transition-property: transform;
    transition-timing-function: ease;
    width: ${({ theme }) => theme.rem(40)};
  }

  &::before {
    top: ${({ theme }) => theme.rem(10)};
  }

  &::after {
    top: ${({ theme }) => theme.rem(20)};
  }
`;

export const StyledButton = styled.button<{
  isOpened: boolean;
}>`
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  height: ${({ theme }) => theme.rem(24)};
  margin-right: ${({ theme }) => theme.rem(10)};
  padding: 0;
  position: relative;
  width: ${({ theme }) => theme.rem(40)};
  z-index: 40;

  ${StyledButtonHelper} {
    ${({ isOpened }) =>
      isOpened &&
      css`
        top: 0;
        transform: translate3d(0, 10px, 0) rotate(135deg);
        transition-delay: 75ms;

        &::before {
          opacity: 0;
          transition-delay: 0s;
        }

        &::after {
          top: ${({ theme }) => theme.rem(20)};
          transform: translate3d(0, -20px, 0) rotate(-270deg);
          transition-delay: 75ms;
        }
      `}
  }

  &:focus {
    outline: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-right: ${({ theme }) => theme.rem(5)};
    top: ${({ theme }) => theme.rem(-20)};
  }
`;
