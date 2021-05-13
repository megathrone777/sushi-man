import { fonts } from "~/theme/variables/fonts";

export const rem = (px: number): string => {
  const baseFontSize = fonts.initialFontSize;
  return `${px / baseFontSize}rem`;
};
