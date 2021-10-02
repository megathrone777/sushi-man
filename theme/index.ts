import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider,
} from "styled-components";

import { breakpoints } from "./variables/breakpoints";
import { colors } from "./variables/colors";
import { fonts } from "./variables/fonts";

const theme: DefaultTheme = {
  breakpoints,
  colors,
  fonts,
  rem: (px) => {
    const baseFontSize = fonts.initialFontSize;

    return `${px / baseFontSize}rem`;
  },
};

export { createGlobalStyle, css, styled, theme, ThemeProvider };
