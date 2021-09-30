import { styled } from "~/theme";

export const StyledWrapper = styled.div`
  width: 45%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.rem(20)};
    width: 100%;
  }
`;

export const StyledTitle = styled.h2`
  border-bottom: ${({ theme }) => theme.rem(3)} solid #da2628;
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

export const StyledLayout = styled.div``;

export const StyledInputWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${({ theme }) => theme.rem(20)};
  position: relative;
`;

const StyledInput = styled.input`
  background-position: ${({ theme }) => theme.rem(5)} center;
  background-repeat: no-repeat;
  background-size: auto ${({ theme }) => theme.rem(20)};
  border-radius: ${({ theme }) => theme.rem(2)};
  border: none;
  border-bottom: ${({ theme }) => theme.rem(2)} solid #da2628;
  font: ${({ theme }) => `${theme.rem(16)} ${theme.fonts.fontMedium}`};
  height: ${({ theme }) => theme.rem(35)};
  padding: 0 ${({ theme }) => theme.rem(30)};
  width: ${({ theme }) => theme.rem(400)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }

  &:focus {
    outline: none;
  }
`;

export const StyledNameInput = styled(StyledInput)`
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' %3E%3Cpath fill='%23da2628' d='M352,384H317.61523c-19.65039,17.98828-39.01953,33.541-55.49023,45.84766a63.66049,63.66049,0,0,1-76.25.00195C169.4043,417.543,150.03516,401.98828,130.38477,384H96A95.99975,95.99975,0,0,0,0,480a32.00033,32.00033,0,0,0,32,32H416a32.00033,32.00033,0,0,0,32-32A95.99975,95.99975,0,0,0,352,384ZM205.0293,404.21484a31.66414,31.66414,0,0,0,37.9414,0C288.459,370.22266,400,277.51172,400,185.68359,400,70.31836,321.18164,0,224,0,126.791,0,48,70.31836,48,185.68359,48,277.51172,159.541,370.22266,205.0293,404.21484ZM240,252a60.00047,60.00047,0,0,1,60-60h24a12.0006,12.0006,0,0,1,12,12v8a60.00047,60.00047,0,0,1-60,60H252a12.0006,12.0006,0,0,1-12-12ZM112,212v-8a12.0006,12.0006,0,0,1,12-12h24a60.00047,60.00047,0,0,1,60,60v8a12.0006,12.0006,0,0,1-12,12H172A60.00047,60.00047,0,0,1,112,212Z' /%3E%3C/svg%3E");
`;

export const StyledPhoneInput = styled(StyledInput)`
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23da2628' d='M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z'%3E%3C/path%3E%3C/svg%3E");
`;

export const StyledDeliveryInput = styled(StyledInput)`
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath fill='%23da2628' d='M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z'%3E%3C/path%3E%3C/svg%3E");
`;

export const StyledInfo = styled.p`
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath fill='%23da2628' d='M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: auto ${({ theme }) => theme.rem(20)};
  background-position: ${({ theme }) => theme.rem(5)} center;
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
  color: #da2628;
  font-family: ${({ theme }) => theme.fonts.fontBold};
`;

export const StyledRadio = styled.input`
  appearance: none;
  background-image: url("data:image/svg+xml,%0A%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23da2628' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'%3E%3C/path%3E%3C/svg%3E%0A");
  background-position: ${({ theme }) => `${theme.rem(-50)} center`};
  background-repeat: no-repeat;
  background-size: ${({ theme }) => `${theme.rem(17)} ${theme.rem(17)}`};
  border-radius: 50%;
  border: ${({ theme }) => theme.rem(2)} solid #da2628;
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
    color: #da2628;
  }
`;

export const StyledMap = styled.div`
  height: ${({ theme }) => theme.rem(200)};
  margin-bottom: ${({ theme }) => theme.rem(20)};
  margin-top: ${({ theme }) => theme.rem(20)};
`;

export const StyledLengthInKm = styled.p`
  display: inline-block;
  margin-left: ${({ theme }) => theme.rem(10)};
`;

export const StyledCurrentLocationButton = styled.button`
  background: none;
  border: none;
  color: #da2628;
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
  text-align: right;
  margin-right: ${({ theme }) => theme.rem(30)};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-top: ${({ theme }) => theme.rem(15)};
  }
`;
