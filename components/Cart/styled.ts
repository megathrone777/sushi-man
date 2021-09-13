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
  padding: 2px;
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
