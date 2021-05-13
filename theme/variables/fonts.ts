export interface Fonts {
  initialFontSize: number;
  font: string;
  fontExtraBold: string;
  fontSemiBold: string;
  fontBold: string;
  fontBlack: string;
}

const fonts: Fonts = {
  initialFontSize: 16,
  font: "Montserrat",
  fontExtraBold: "MontserratExtraBold",
  fontSemiBold: "MontserratSemiBold",
  fontBold: "MontserratBold",
  fontBlack: "MontserratBlack",
};

export { fonts };
