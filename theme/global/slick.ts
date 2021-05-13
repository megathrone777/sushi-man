import { css } from "~/theme";

const slick = css`
  .slick-slider {
    position: relative;

    display: block;
    box-sizing: border-box;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }

  .slick-list {
    position: relative;
    display: block;
    overflow: hidden;
    margin-left: -10px;
    margin-right: -10px;
    padding: 0;
  }

  .slick-list:focus {
    outline: none;
  }

  .slick-list.dragging {
    cursor: pointer;
    cursor: hand;
  }

  .slick-slider .slick-track,
  .slick-slider .slick-list {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .slick-track {
    position: relative;
    top: 0;
    left: 0;

    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .slick-track:before,
  .slick-track:after {
    display: table;

    content: "";
  }
  .slick-track:after {
    clear: both;
  }
  .slick-loading .slick-track {
    visibility: hidden;
  }

  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;

    & > div {
      padding: 0 10px;
    }

    &:focus {
      outline: none;
    }
  }
  [dir="rtl"] .slick-slide {
    float: right;
  }
  .slick-slide img {
    display: block;
    width: 100%;
  }
  .slick-slide.slick-loading img {
    display: none;
  }

  .slick-slide.dragging img {
    pointer-events: none;
  }

  .slick-initialized .slick-slide {
    display: block;
  }

  .slick-loading .slick-slide {
    visibility: hidden;
  }

  .slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent;
  }

  .slick-arrow.slick-hidden {
    display: none;
  }

  .slick-arrow {
    background: url("/images/reviews_arrow_bg.png") center center/100% 100%
      no-repeat;
    border: none;
    cursor: pointer;
    height: 60px;
    position: absolute;
    text-indent: -9999px;
    top: 50%;
    width: 40px;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      display: none !important;
    }

    &:focus {
      outline: none;
    }
  }

  .slick-prev {
    left: -80px;
    transform: translateY(-50%);

    @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
      left: -38px;
    }
  }

  .slick-next {
    right: -80px;
    transform-origin: center top;
    transform: rotate(180deg) translateY(-50%);

    @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
      right: -38px;
    }
  }

  .slick-center {
    transitiontransform: 0.3s ease-in;
    transform: scale(1.2);
    transform-origin: center 415px;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
      transform-origin: center center;
      transform: none;
    }
  }
`;

export { slick };
