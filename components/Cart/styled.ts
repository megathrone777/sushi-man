import { css, styled } from "~/theme";

export const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.rem(30)};
`;

export const StyledLayout = styled.div``;

export const StyledTable = styled.table<{ isSmall?: boolean }>`
  border-bottom: 2px solid #da2628;
  border-top: 2px solid #da2628;
  margin-bottom: ${({ theme }) => theme.rem(40)};
  table-layout: fixed;
  width: 100%;
`;

export const StyledTableCaption = styled.caption`
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
  padding: ${({ theme }) => theme.rem(10)};
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

export const StyledImage = styled.img`
  border-radius: 50%;
  display: block;
  height: ${({ theme }) => theme.rem(85)};
  margin: 0 auto;
  overflow: hidden;
  width: ${({ theme }) => theme.rem(85)};
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
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  height: 18px;
  padding: 0;
  width: 18px;
`;

export const StyledTotal = styled.p`
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
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
    box-shadow: 0px 0px ${({ theme }) => theme.rem(14)} 0px
      rgba(218, 38, 40, 0.75);
  }
`;

export const StyledRemove = styled.button`
  border: none;
  background: none;
  color: #da2628;
  cursor: pointer;
  font-size: ${({ theme }) => theme.rem(20)};
`;
