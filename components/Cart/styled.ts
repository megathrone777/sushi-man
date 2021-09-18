import { styled } from "~/theme";

export const StyledWrapper = styled.div`
  border-bottom: ${({ theme }) => theme.rem(10)} solid #da2628;
  padding: ${({ theme }) =>
    `${theme.rem(30)} ${theme.rem(30)} ${theme.rem(50)}`};
  overflow: hidden;
`;

export const StyledLayout = styled.div``;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledTable = styled.table<{ isSmall?: boolean }>`
  border-bottom: 3px solid #da2628;
  border-top: 3px solid #da2628;
  margin-bottom: ${({ theme }) => theme.rem(40)};
  table-layout: fixed;
  width: ${({ isSmall }) => (isSmall ? "45%" : "100%")};
`;

export const StyledTableCaption = styled.caption`
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
  padding: ${({ theme }) => theme.rem(10)};
  text-align: left;
`;

export const StyledTableRow = styled.tr``;

export const StyledTableCell = styled.td`
  padding: ${({ theme }) => theme.rem(10)};
  vertical-align: middle;
  text-align: center;
`;

export const StyledTableTheadCell = styled.th`
  font-family: ${({ theme }) => theme.fonts.fontBold};
  padding: ${({ theme }) => theme.rem(5)};
  vertical-align: middle;
`;

export const StyledBold = styled.span`
  font-family: ${({ theme }) => theme.fonts.fontBold};
`;

export const StyledLink = styled.a``;

export const StyledImage = styled.img`
  border-radius: ${({ theme }) => theme.rem(10)};
  display: block;
  height: auto;
  margin: 0 auto;
  overflow: hidden;
  width: ${({ theme }) => theme.rem(75)};
`;

export const StyledQuantityLabel = styled.p`
  font-family: ${({ theme }) => theme.fonts.fontBold};
  margin-right: ${({ theme }) => theme.rem(10)};
`;

export const StyledQuantityWrapper = styled.div`
  align-items: center;
  display: inline-flex;
  position: relative;
`;

export const StyledQuantityInput = styled.input`
  appearance: textfield;
  border-radius: ${({ theme }) => theme.rem(2)};
  border: ${({ theme }) => theme.rem(2)} solid #da2628;
  font: ${({ theme }) => `${theme.rem(16)} ${theme.fonts.fontBold}`};
  height: ${({ theme }) => theme.rem(30)};
  margin: 0 ${({ theme }) => theme.rem(10)};
  text-align: center;
  width: ${({ theme }) => theme.rem(52)};

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
  }

  &:focus {
    outline: none;
  }
`;

export const StyledQuantityButton = styled.button<{
  isIncrease?: boolean;
  isDecrease?: boolean;
}>`
  align-items: center;
  background: none;
  border: 2px solid black;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  height: ${({ theme }) => theme.rem(22)};
  padding: ${({ theme }) => theme.rem(2)};
  width: ${({ theme }) => theme.rem(22)};

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledTotal = styled.p`
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
  margin-bottom: ${({ theme }) => theme.rem(22)};
  text-align: right;
`;

export const StyledEmpty = styled.p`
  align-items: center;
  display: flex;
`;

export const StyledSushiMan = styled.img`
  max-width: ${({ theme }) => theme.rem(150)};
`;

export const StyledButtons = styled.div`
  text-align: right;
`;

export const StyledBuy = styled.button`
  background-color: #da2628;
  border: none;
  color: white;
  cursor: pointer;
  display: inline-block;
  font: ${({ theme }) => `${theme.rem(22)} ${theme.fonts.fontSemiBold}`};
  height: ${({ theme }) => theme.rem(55)};
  line-height: ${({ theme }) => theme.rem(55)};
  min-width: ${({ theme }) => theme.rem(190)};
  padding: 0 ${({ theme }) => theme.rem(15)};
  text-align: center;
  text-decoration: none;
  transition: 0.2s ease-in;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: ${({ theme }) => theme.rem(45)};
    line-height: ${({ theme }) => theme.rem(45)};
    font-size: ${({ theme }) => theme.rem(16)};
    min-width: ${({ theme }) => theme.rem(140)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: ${({ theme }) => theme.rem(37)};
    line-height: ${({ theme }) => theme.rem(37)};
    min-width: ${({ theme }) => theme.rem(110)};
    position: absolute;
    top: 40%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    top: ${({ theme }) => theme.rem(100)};
  }

  &:hover {
    box-shadow: 0 0 ${({ theme }) => theme.rem(14)} 0 rgba(218, 38, 40, 0.75);
  }
`;

export const StyledDeliveryInput = styled.input`
  background-image: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'%3E%3Cpath fill='%23da2628' d='M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: auto ${({ theme }) => theme.rem(20)};
  background-position: 5px center;
  border-radius: ${({ theme }) => theme.rem(2)};
  border: ${({ theme }) => theme.rem(2)} solid #da2628;
  font: ${({ theme }) => `${theme.rem(16)} ${theme.fonts.fontBold}`};
  height: ${({ theme }) => theme.rem(35)};
  padding: 0 ${({ theme }) => theme.rem(25)};

  &:focus {
    outline: none;
  }
`;

export const StyledRemove = styled.button`
  background: none;
  border: none;
  color: #da2628;
  cursor: pointer;
  font-size: ${({ theme }) => theme.rem(20)};

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledRadioWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const StyledRadioLabel = styled.label`
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.fontSemiBold};
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
  margin-right: ${({ theme }) => theme.rem(10)};
  width: ${({ theme }) => theme.rem(25)};

  &:checked {
    background-position: center center;
  }
`;
