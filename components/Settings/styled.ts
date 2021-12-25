import { css, styled } from "~/theme";

export const StyledWrapper = styled.div`
  padding: ${({ theme }) => `${theme.rem(150)} 0`};
  text-align: center;
`;

export const StyledDivider = styled.hr`
  border: none;
  height: ${({ theme }) => theme.rem(40)};
`;

export const StyledButton = styled.button<{ isActive: boolean }>`
  border: none;
  border-radius: ${({ theme }) => theme.rem(5)};
  color: white;
  cursor: pointer;
  display: inline-block;
  font: ${({ theme }) => `${theme.rem(22)} ${theme.fonts.fontMedium}`};
  height: ${({ theme }) => theme.rem(55)};
  line-height: ${({ theme }) => theme.rem(55)};
  min-width: ${({ theme }) => theme.rem(190)};
  padding: 0 ${({ theme }) => theme.rem(15)};
  text-align: center;
  text-decoration: none;
  transition: 0.2s ease-in;

  ${({ isActive, theme }) =>
    isActive
      ? css`
          background-color: green;
        `
      : css`
          background-color: ${theme.colors.red};
        `}

  &:hover {
    box-shadow: 0 0
      ${({ isActive, theme }) =>
        `${theme.rem(14)} 0 ${isActive ? "green" : "rgba(218, 38, 40, 0.75)"}`};
  }
`;
