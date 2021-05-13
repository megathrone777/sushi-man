import { css } from "~/theme";

const base = css`
  * {
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
  }

  html {
    font-size: ${({ theme }): string | number => theme.fonts.initialFontSize}px;
  }

  body {
    font-family: ${({ theme }): string => theme.fonts.font};
  }

  img {
    max-width: 100%;
  }

  svg {
    height: 100%;
    width: 100%;
  }
`;

export { base };
