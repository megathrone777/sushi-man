import { style } from "@/theme";

export const wrapperClass = style({
  backfaceVisibility: "hidden",
  height: 30,
  position: "relative",
  width: 30,
  willChange: "transform",
});

export const iconClass = style(({ colors }) => ({
  fill: "none",
  stroke: colors.amber,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
}));

export const textClass = style(({ colors, fonts }) => ({
  color: colors.amber,
  fill: colors.amber,
  fontSize: 9,
  fontWeight: fonts.bold,
  stroke: "none",
  transform: "translateY(-1px)",
}));

export const layoutClass = style({
  alignItems: "center",
  display: "flex",
  height: "100%",
  inset: 0,
  justifyContent: "center",
  margin: "auto",
  pointerEvents: "none",
  position: "absolute",
  transform: "rotate(0deg)",
  transformOrigin: "center",
  transition: "transform .25s linear",
  width: "100%",
});

export const headingClass = style({
  alignItems: "flex-start",
  display: "flex",
  height: 55,
  inset: 0,
  justifyContent: "center",
  margin: "auto",
  position: "absolute",
  width: 55,

  "::before": {
    backgroundImage:
      "url('data:image/svg+xml,%0A%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"%3E%3Cpath d=\"M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z\" fill=\"%23fb1f1f\" /%3E%3C/svg%3E')",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    content: "''",
    display: "block",
    height: 20,
    transform: "rotate(-6deg)",
    width: 20,
  },
});

export const tooltipClass = style(({ colors, fonts }) => ({
  backgroundColor: colors.grayDarkest,
  borderRadius: 4,
  bottom: "100%",
  color: colors.white,
  columnGap: 8,
  display: "none",
  fontSize: 12,
  fontWeight: fonts.normal,
  left: "50%",
  marginBottom: 4,
  padding: "5px 7px",
  position: "absolute",
  selectors: {
    [`${wrapperClass}:hover &`]: {
      display: "flex",
    },
  },
  transform: "translateX(-50%)",
  whiteSpace: "nowrap",
}));

export const speedClass = style(({ colors, fonts }) => ({
  color: colors.amber,
  display: "inline-block",
  fontSize: 11,
  fontStyle: "italic",
  fontWeight: fonts.bold,
  position: "absolute",
  textAlign: "center",
  top: 23,
  whiteSpace: "nowrap",
}));
