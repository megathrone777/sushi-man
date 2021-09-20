import { css, styled } from "~/theme";

export const StyledWrapper = styled.div``;

export const StyledTitle = styled.h2`
  border-bottom: ${({ theme }) => theme.rem(3)} solid #da2628;
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
  padding: ${({ theme }) => theme.rem(10)};
`;

export const StyledHeader = styled.div`
  display: flex;
  height: ${({ theme }) => theme.rem(60)};
  margin-bottom: ${({ theme }) => theme.rem(10)};
`;

export const StyledContent = styled.div<{ isVisible: boolean }>`
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

export const StyledLayout = styled.div``;

export const StyledInputWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(20)};
`;

export const StyledInfo = styled.p`
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath fill='%23da2628' d='M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: auto ${({ theme }) => theme.rem(20)};
  background-position: 5px center;
  margin-top: ${({ theme }) => theme.rem(27)};
  padding-left: ${({ theme }) => theme.rem(30)};
`;

export const StyledInfoLabel = styled.span`
  margin-right: ${({ theme }) => theme.rem(10)};
`;
