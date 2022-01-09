import { keyframes, styled } from "~/theme";

const rotate = keyframes`
  from {
    transform: rotate(0deg) translateY(-50%);
  }

  to {
    transform: rotate(360deg) translateY(-50%);
  }
`;

export const StyledWrapper = styled.div`
  grid-area: delivery;
  margin-bottom: ${({ theme }) => theme.rem(20)};
`;

export const StyledTitle = styled.h2`
  border-bottom: ${({ theme }) => `${theme.rem(3)} solid ${theme.colors.red}`};
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
  padding: ${({ theme }) => theme.rem(10)};
`;

export const StyledHeader = styled.div`
  display: flex;
  height: ${({ theme }) => theme.rem(60)};
  margin-bottom: ${({ theme }) => theme.rem(10)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

export const StyledContent = styled.div``;

export const StyledLayout = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(20)};
`;

export const StyledInputWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(20)};
  position: relative;
  width: ${({ theme }) => theme.rem(400)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

const StyledInput = styled.input<{ hasError: boolean }>`
  appearance: none;
  background-color: white;
  background-position: ${({ theme }) => theme.rem(5)} center;
  background-repeat: no-repeat;
  background-size: auto ${({ theme }) => theme.rem(20)};
  border-radius: 0;
  border: none;
  border-bottom: ${({ theme }) => `${theme.rem(2)} solid ${theme.colors.red}`};
  font: ${({ theme }) => `${theme.rem(16)} ${theme.fonts.fontMedium}`};
  height: ${({ theme }) => theme.rem(36)};
  padding: 0 ${({ theme }) => theme.rem(30)};
  width: 100%;

  &:focus {
    outline: none;
  }

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }

  &::-webkit-input-placeholder {
    color: ${({ theme, hasError }) =>
      hasError ? `${theme.colors.red}` : "rgb(118, 118, 118)"};
  }

  &:-moz-placeholder {
    color: ${({ theme, hasError }) =>
      hasError ? `${theme.colors.red}` : "rgb(118, 118, 118)"};
  }

  &::-moz-placeholder {
    color: ${({ theme, hasError }) =>
      hasError ? `${theme.colors.red}` : "rgb(118, 118, 118)"};
  }

  &:-ms-input-placeholder {
    color: ${({ theme, hasError }) =>
      hasError ? `${theme.colors.red}` : "rgb(118, 118, 118)"};
  }
`;

export const StyledNameInput = styled(StyledInput)`
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' %3E%3Cpath fill='%23da2628' d='M352,384H317.61523c-19.65039,17.98828-39.01953,33.541-55.49023,45.84766a63.66049,63.66049,0,0,1-76.25.00195C169.4043,417.543,150.03516,401.98828,130.38477,384H96A95.99975,95.99975,0,0,0,0,480a32.00033,32.00033,0,0,0,32,32H416a32.00033,32.00033,0,0,0,32-32A95.99975,95.99975,0,0,0,352,384ZM205.0293,404.21484a31.66414,31.66414,0,0,0,37.9414,0C288.459,370.22266,400,277.51172,400,185.68359,400,70.31836,321.18164,0,224,0,126.791,0,48,70.31836,48,185.68359,48,277.51172,159.541,370.22266,205.0293,404.21484ZM240,252a60.00047,60.00047,0,0,1,60-60h24a12.0006,12.0006,0,0,1,12,12v8a60.00047,60.00047,0,0,1-60,60H252a12.0006,12.0006,0,0,1-12-12ZM112,212v-8a12.0006,12.0006,0,0,1,12-12h24a60.00047,60.00047,0,0,1,60,60v8a12.0006,12.0006,0,0,1-12,12H172A60.00047,60.00047,0,0,1,112,212Z' /%3E%3C/svg%3E");
`;

export const StyledPhoneInput = styled(StyledInput)`
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23da2628' d='M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z'%3E%3C/path%3E%3C/svg%3E");
`;

export const StyledDeliveryInput = styled(StyledInput)`
  appearance: searchfield;
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath fill='%23da2628' d='M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z'%3E%3C/path%3E%3C/svg%3E");

  &::-webkit-search-cancel-button {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' %3E%3Cpath d='M0 0h24v24H0V0z' fill='none' /%3E%3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' fill='black' /%3E%3C/svg%3E");
    background-position: center center;
    background-size: 100% 100%;
    position: relative;
    top: ${({ theme }) => theme.rem(1)};
    height: ${({ theme }) => theme.rem(24)};
    width: ${({ theme }) => theme.rem(24)};
  }
`;

export const StyledEmailInput = styled(StyledInput)`
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23da2628' d='M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z'%3E%3C/path%3E%3C/svg%3E");
`;

export const StyledInfo = styled.p`
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath fill='%23da2628' d='M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z'%3E%3C/path%3E%3C/svg%3E");
  background-position: ${({ theme }) => theme.rem(5)} center;
  background-repeat: no-repeat;
  background-size: auto ${({ theme }) => theme.rem(20)};
  margin-top: ${({ theme }) => theme.rem(27)};
  padding-left: ${({ theme }) => theme.rem(30)};
`;

export const StyledInfoLabel = styled.span`
  margin-right: ${({ theme }) => theme.rem(10)};
`;

export const StyledRadioWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-right: ${({ theme }) => theme.rem(30)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-right: ${({ theme }) => theme.rem(20)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    margin-right: ${({ theme }) => theme.rem(10)};
  }
`;

export const StyledRadioLabel = styled.label`
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.fontMedium};
`;

export const StyledRadioLabelInfo = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-family: ${({ theme }) => theme.fonts.fontBold};
`;

export const StyledRadio = styled.input`
  appearance: none;
  background-image: url("data:image/svg+xml,%0A%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23da2628' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'%3E%3C/path%3E%3C/svg%3E%0A");
  background-position: ${({ theme }) => `${theme.rem(-50)} center`};
  background-repeat: no-repeat;
  background-size: ${({ theme }) => `${theme.rem(17)} ${theme.rem(17)}`};
  border-radius: 50%;
  border: ${({ theme }) => `${theme.rem(2)} solid ${theme.colors.red}`};
  cursor: pointer;
  display: inline-block;
  height: ${({ theme }) => theme.rem(25)};
  margin-top: 0;
  margin-right: ${({ theme }) => theme.rem(10)};
  min-width: ${({ theme }) => theme.rem(25)};
  width: ${({ theme }) => theme.rem(25)};

  &:checked {
    background-position: center center;
  }
`;

export const StyledLink = styled.a`
  color: black;
  font-family: ${({ theme }) => theme.fonts.fontMedium};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.red};
  }
`;

export const StyledMap = styled.div`
  box-shadow: 0 0 ${({ theme }) => theme.rem(5)} 0 rgba(0, 0, 0, 0.5);
  height: ${({ theme }) => theme.rem(200)};
  margin-bottom: ${({ theme }) => theme.rem(20)};
  margin-top: ${({ theme }) => theme.rem(20)};
  pointer-events: none;
`;

export const StyledLengthInKm = styled.p`
  display: inline-block;
  margin-left: ${({ theme }) => theme.rem(10)};
  position: absolute;
  left: calc(100% + ${({ theme }) => theme.rem(10)});
  top: ${({ theme }) => theme.rem(10)};
  white-space: nowrap;
`;

export const StyledCurrentLocationButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
  height: ${({ theme }) => theme.rem(35)};
  margin-left: ${({ theme }) => theme.rem(10)};
  padding: 0;
  width: ${({ theme }) => theme.rem(35)};

  &:hover {
    opacity: 0.7;
  }
`;

export const StyledDeliveryPrice = styled.p`
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
  text-align: left;
  margin-right: ${({ theme }) => theme.rem(30)};
  width: ${({ theme }) => theme.rem(400)};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-top: ${({ theme }) => theme.rem(15)};
  }
`;

export const StyledDeliveryError = styled.p`
  color: ${({ theme }) => theme.colors.red};
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
  text-align: left;
  margin-right: ${({ theme }) => theme.rem(30)};
  width: ${({ theme }) => theme.rem(400)};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-top: ${({ theme }) => theme.rem(15)};
  }
`;

export const StyledDeliveryPriceResult = styled.span`
  font-size: ${({ theme }) => theme.rem(16)};
`;

export const StyledErrorIcon = styled.span`
  color: ${({ theme }) => theme.colors.red};
  display: block;
  height: ${({ theme }) => theme.rem(20)};
  position: absolute;
  right: ${({ theme }) => theme.rem(-20)};
  top: 50%;
  transform: translateY(-50%);
  width: ${({ theme }) => theme.rem(20)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 0;
  }
`;

export const StyledTerms = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.rem(30)};
  }
`;

export const StyledText = styled.p`
  font-family: ${({ theme }) => theme.fonts.fontMedium};
  margin-top: ${({ theme }) => theme.rem(12)};
  padding-left: ${({ theme }) => theme.rem(10)};
`;

export const StyledTextPrice = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-family: ${({ theme }) => theme.fonts.fontBold};
`;

export const StyledAddressLoader = styled.span`
  align-items: center;
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-name: ${rotate};
  animation-timing-function: linear;
  color: ${({ theme }) => theme.colors.red};
  display: flex;
  height: ${({ theme }) => theme.rem(25)};
  justify-content: center;
  margin: auto;
  position: absolute;
  right: ${({ theme }) => theme.rem(10)};
  top: 50%;
  transform-origin: center top;
  width: ${({ theme }) => theme.rem(25)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: ${({ theme }) => theme.rem(40)};
  }
`;
