import { css, styled } from "~/theme";

export const StyledWrapper = styled.div`
  border-bottom: ${({ theme }) => theme.rem(4)} solid #da2628;
  padding: ${({ theme }) =>
    `${theme.rem(30)} ${theme.rem(30)} ${theme.rem(50)}`};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: ${({ theme }) => theme.rem(10)};
    padding-left: ${({ theme }) => theme.rem(10)};
    padding-right: ${({ theme }) => theme.rem(10)};
  }
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column-reverse;
  }
`;

export const StyledTable = styled.table<{ isSmall?: boolean }>`
  border-top: 3px solid #da2628;
  margin-bottom: ${({ theme }) => theme.rem(40)};
  text-align: center;
  table-layout: fixed;
  width: ${({ isSmall }) => (isSmall ? "45%" : "100%")};

  ${({ isSmall }) =>
    isSmall &&
    css`
      min-height: 220px;
      text-align: left;

      @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        margin-bottom: ${({ theme }) => theme.rem(20)};
        min-height: 0;
        text-align: justify;
        width: 100%;
      }
    `}
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

export const StyledAdditionalName = styled.span`
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
`;

export const StyledQuantityLabel = styled.p`
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
  margin-right: ${({ theme }) => theme.rem(10)};
`;

export const StyledQuantityPrice = styled.span`
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
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
  border-radius: ${({ theme }) => theme.rem(5)};
  color: white;
  cursor: pointer;
  display: inline-block;
  font: ${({ theme }) => `${theme.rem(22)} ${theme.fonts.fontMedium}`};
  height: ${({ theme }) => theme.rem(55)};
  line-height: ${({ theme }) => theme.rem(55)};
  min-width: ${({ theme }) => theme.rem(190)};
  padding: 0 ${({ theme }) => theme.rem(15)};
  text-align: center;
  text-decoration: none;
  transition: 0.2s ease-in;

  &:hover {
    box-shadow: 0 0 ${({ theme }) => theme.rem(14)} 0 rgba(218, 38, 40, 0.75);
  }
`;

export const StyledPersons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.rem(20)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column-reverse;
    margin-bottom: ${({ theme }) => theme.rem(20)};
  }
`;

export const StyledPersonsText = styled.p`
  font: ${({ theme }) => `${theme.rem(16)} ${theme.fonts.fontMedium}`};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.rem(15)};
  }
`;

export const StyledPersonsTextLabel = styled.span`
  color: #da2628;
  font-family: ${({ theme }) => theme.fonts.fontBold};
`;

export const StyledPersonsColumn = styled.div`
  width: 50%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }

  &:last-of-type {
    text-align: right;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      margin-bottom: ${({ theme }) => theme.rem(10)};
      text-align: left;
    }
  }
`;

export const StyledQuantityWrapper = styled.div`
  align-items: center;
  display: inline-flex;
  position: relative;
  margin-right: 15px;
`;

export const StyledQuantityInput = styled.input`
  appearance: none;
  border: none;
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
  height: ${({ theme }) => theme.rem(30)};
  margin: 0 ${({ theme }) => theme.rem(0)};
  text-align: center;
  width: ${({ theme }) => theme.rem(50)};

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

export const StyledPrice = styled.span`
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
`;