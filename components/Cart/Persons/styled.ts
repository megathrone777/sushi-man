import { styled } from "~/theme";

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.rem(20)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column-reverse;
    margin-bottom: ${({ theme }) => theme.rem(20)};
  }
`;

export const StyledColumn = styled.div`
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
  margin-right: ${({ theme }) => theme.rem(15)};
`;

export const StyledQuantity = styled.p`
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

export const StyledQuantityLabel = styled.p`
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
  margin-right: ${({ theme }) => theme.rem(10)};
`;

export const StyledQuantityPrice = styled.span`
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
`;

export const StyledText = styled.p`
  font: ${({ theme }) => `${theme.rem(16)} ${theme.fonts.fontMedium}`};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.rem(15)};
  }
`;

export const StyledTextLabel = styled.span`
  color: #da2628;
  font-family: ${({ theme }) => theme.fonts.fontBold};
`;


