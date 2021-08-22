import * as styledComponents from "styled-components";

import { breakpoints, Breakpoints } from "./variables/breakpoints";
import { fonts, Fonts } from "./variables/fonts";

interface ThemeInterface {
  breakpoints: Breakpoints;
  fonts: Fonts;
  rem: (px: number) => string;
}

const {
  ThemeProvider,
  createGlobalStyle,
  default: styled,
  css,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  ThemeInterface
>;

const theme: ThemeInterface = {
  breakpoints,
  fonts,
  rem: (px) => {
    const baseFontSize = fonts.initialFontSize;
    
    return `${px / baseFontSize}rem`;
  },
};

export { styled, theme, ThemeProvider, css, createGlobalStyle };
