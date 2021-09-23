import { styled } from "~/theme";

export const StyledTable = styled.table`
  border-top: ${({ theme }) => theme.rem(3)} solid #da2628;
  margin-bottom: ${({ theme }) => theme.rem(40)};
  min-height: ${({ theme }) => theme.rem(220)};
  table-layout: fixed;
  text-align: left;
  width: 45%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.rem(20)};
    min-height: 0;
    width: 100%;
  }
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
`;

export const StyledName = styled.span`
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
`;

export const StyledPrice = styled.span`
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
`;

export const StyledQuantityWrapper = styled.div`
  align-items: center;
  display: inline-flex;
  position: relative;
  margin-right: ${({ theme }) => theme.rem(15)};
`;

export const StyledQuantity = styled.p`
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
  height: ${({ theme }) => theme.rem(24)};
  line-height: ${({ theme }) => theme.rem(24)};
  text-align: center;
  vertical-align: middle;
  width: ${({ theme }) => theme.rem(50)};
`;

export const StyledQuantityButton = styled.button<{
  isIncrease?: boolean;
  isDecrease?: boolean;
}>`
  align-items: center;
  background: none;
  border-radius: 50%;
  border: ${({ theme }) => theme.rem(2)} solid black;
  cursor: pointer;
  display: flex;
  height: ${({ theme }) => theme.rem(22)};
  justify-content: center;
  padding: 0;
  width: ${({ theme }) => theme.rem(22)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: ${({ theme }) => theme.rem(-4)};
  }

  &:hover {
    opacity: 0.8;
  }
`;
