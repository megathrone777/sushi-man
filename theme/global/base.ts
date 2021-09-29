import { css } from "~/theme";

const base = css`
  * {
    box-sizing: border-box;
  }

  #__next,
  html,
  body {
    height: 100%;
    width: 100%;
  }

  html {
    font-size: ${({ theme }): string | number => theme.fonts.initialFontSize}px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }): string => theme.fonts.font};
  }

  img {
    max-width: 100%;
    vertical-align: middle;
  }

  svg {
    height: 100%;
    width: 100%;
  }

  a[href^="http://maps.google.com/maps"],
  a[href^="https://maps.google.com/maps"],
  a[href^="https://www.google.com/maps"]
  {
    display: none !important;
  }

  .gmnoprint:not(.gm-bundled-control) {
    display: none;
  }
`;

export { base };
