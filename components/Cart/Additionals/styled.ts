import { styled } from "~/theme";

export const StyledWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(40)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.rem(20)};
    min-height: 0;
  }
`;

export const StyledLayout = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const StyledContent = styled.div``;

export const StyledTitle = styled.h2`
  border-bottom: ${({ theme }) => theme.rem(3)} solid #da2628;
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
  padding: ${({ theme }) => theme.rem(10)};
  text-align: left;
  width: 100%;
`;

export const StyledTable = styled.table`
  margin-bottom: ${({ theme }) => theme.rem(20)};
  min-height: ${({ theme }) => theme.rem(220)};
  table-layout: fixed;
  text-align: left;
`;

export const StyledTableRow = styled.tr``;

export const StyledTableCell = styled.td`
  padding: ${({ theme }) => theme.rem(10)};
  vertical-align: middle;
  width: 33.3333%;
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

export const StyledNoteWrapper = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.rem(30)};
  }
`;

export const StyledNoteContent = styled.div`
  position: relative;
`;

export const StyledNoteIcon = styled.i`
  color: #da2628;
  position: absolute;
  display: block;
  top: ${({ theme }) => theme.rem(1)};
  width: ${({ theme }) => theme.rem(30)};
`;

export const StyledNoteLabel = styled.p`
  border-bottom: ${({ theme }) => theme.rem(3)} solid #da2628;
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
  margin-bottom: ${({ theme }) => theme.rem(20)};
  padding: ${({ theme }) => theme.rem(10)};
`;

export const StyledNote = styled.textarea`
  border: none;
  border-bottom: ${({ theme }) => theme.rem(2)} solid #da2628;
  border-radius: 0;
  display: block;
  font: ${({ theme }) => `${theme.rem(16)} ${theme.fonts.fontMedium}`};
  height: ${({ theme }) => theme.rem(60)};
  padding: ${({ theme }) => `${theme.rem(5)} ${theme.rem(40)}`};
  resize: none;
  width: 100%;

  &:focus {
    outline: none;
  }
`;
