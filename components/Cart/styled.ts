import { css, styled } from "~/theme";

export const StyledWrapper = styled.div`
  padding: ${({ theme }) => theme.rem(30)};
`;

export const StyledLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledTable = styled.table<{ isSmall?: boolean }>`
  border-bottom: 4px solid #da2628;
  border-top: 4px solid #da2628;
  table-layout: fixed;
  width: ${({ isSmall }) => (isSmall ? "40%" : "50%")};
`;

export const StyledTableCaption = styled.caption`
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
  padding: ${({ theme }) => theme.rem(10)};
`;

export const StyledTableRow = styled.tr``;

export const StyledTableCell = styled.td`
  padding: ${({ theme }) => theme.rem(10)};
  vertical-align: middle;
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
  padding-left: ${({ theme }) => theme.rem(5)};
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
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  font-weight: bold;
  font-size: 20px;

  ${({ isIncrease }) =>
    isIncrease &&
    css`
      color: green;
    `}

  ${({ isDecrease }) =>
    isDecrease &&
    css`
      color: #da2628;
    `}
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

export const StyledBuy = styled.button``;

export const StyledRemove = styled.button`
  border: none;
  background: none;
  color: #da2628;
  cursor: pointer;
  font-weight: bold;
  font-size: ${({ theme }) => theme.rem(40)};
`;
