import { css, styled } from "~/theme";

export const StyledWrapper = styled.div``;

export const StyledLayout = styled.div<{
  isOpened: boolean;
}>`
  background: url("/images/contact_bg.jpg") center center/cover no-repeat;
  border-radius: ${({ theme }) => theme.rem(15)};
  height: ${({ theme }) => theme.rem(300)};
  left: 0;
  margin: auto;
  max-width: ${({ theme }) => theme.rem(600)};
  min-width: ${({ theme }) => theme.rem(600)};
  min-height: ${({ theme }) => theme.rem(300)};
  opacity: 0;
  padding: ${({ theme }) => theme.rem(60)} 0;
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s ease-in;
  visibility: hidden;
  z-index: 800;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: calc(100% - ${({ theme }) => theme.rem(20)});
    min-width: 0;
  }

  ${({ isOpened }) =>
    isOpened &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

export const StyledContent = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

export const StyledText = styled.p`
  color: white;
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontSemiBold}`};
  line-height: ${({ theme }) => theme.rem(32)};
  text-align: center;
`;

export const StyledClose = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  height: ${({ theme }) => theme.rem(30)};
  padding: 0;
  position: absolute;
  right: ${({ theme }) => theme.rem(15)};
  top: ${({ theme }) => theme.rem(15)};
  width: ${({ theme }) => theme.rem(30)};

  &:focus {
    outline: none;
  }
`;

export const StyledBackground = styled.div<{ isOpened: boolean }>`
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: ${({ isOpened }) => (isOpened ? "1" : "0")};
  position: fixed;
  right: 0;
  top: 0;
  visibility: ${({ isOpened }) => (isOpened ? "visible" : "hidden")};
  width: 100%;
  z-index: 20;
`;
