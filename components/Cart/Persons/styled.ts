import { styled } from "~/theme";

export const StyledWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(20)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column-reverse;
    margin-bottom: ${({ theme }) => theme.rem(20)};
  }
`;

export const StyledTitle = styled.h2`
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
  border-bottom: ${({ theme }) => `${theme.rem(3)} solid ${theme.colors.red}`};
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
  margin-bottom: ${({ theme }) => theme.rem(10)};
  padding: ${({ theme }) => theme.rem(10)};
`;

export const StyledTable = styled.table`
  margin-bottom: ${({ theme }) => theme.rem(20)};
  table-layout: fixed;
  text-align: left;
  min-width: ${({ theme }) => theme.rem(475)};
`;

export const StyledTableRow = styled.tr``;

export const StyledTableCell = styled.td`
  padding: ${({ theme }) => theme.rem(10)};
  position: relative;
  vertical-align: middle;
`;

export const StyledName = styled.span`
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
`;

export const StyledQuantityWrapper = styled.div`
  align-items: center;
  display: inline-flex;
  position: relative;
`;

export const StyledQuantity = styled.p<{ hasError: boolean }>`
  color: ${({ theme, hasError }) =>
    hasError ? `${theme.colors.red}` : "black"};
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
  height: ${({ theme }) => theme.rem(25)};
  line-height: ${({ theme }) => theme.rem(25)};
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

export const StyledQuantityPrice = styled.span`
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
  margin-left: ${({ theme }) => theme.rem(15)};
`;

export const StyledText = styled.p`
  font: ${({ theme }) => `${theme.rem(16)} ${theme.fonts.fontMedium}`};
  margin-bottom: ${({ theme }) => theme.rem(10)};
  padding-left: ${({ theme }) => theme.rem(10)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.rem(15)};
  }
`;

export const StyledTextLabel = styled.span`
  color: #da2628;
  font-family: ${({ theme }) => theme.fonts.fontBold};
`;

export const StyledError = styled.span`
  color: #da2628;
  font-family: ${({ theme }) => theme.fonts.fontBold};
  left: -${({ theme }) => theme.rem(25)};
  margin-left: ${({ theme }) => theme.rem(10)};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const StyledErrorIcon = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.red};
  height: ${({ theme }) => theme.rem(20)};
  width: ${({ theme }) => theme.rem(20)};
`;
