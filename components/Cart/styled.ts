import { styled } from "~/theme";

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

export const StyledLayout = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column-reverse;
  }
`;

export const StyledColumn = styled.div`
  width: 45%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const StyledTotal = styled.div`
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
  margin-bottom: ${({ theme }) => theme.rem(22)};
  text-align: right;
`;

export const StyledEmpty = styled.p`
  align-items: center;
  display: flex;
  margin-bottom: ${({ theme }) => theme.rem(20)};
  font: ${({ theme }) => theme.rem(30)} ${({ theme }) => theme.fonts.fontBold};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.rem(25)};
    margin-bottom: ${({ theme }) => theme.rem(20)};
  }
`;

export const StyledEmptyImage = styled.img`
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

export const StyledQuantityPrice = styled.span`
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
`;

export const StyledPrice = styled.span`
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
`;

export const StyledCheckbox = styled.input`
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
  margin: 0 ${({ theme }) => theme.rem(10)} 0 0;
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
  width: ${({ theme }) => theme.rem(25)};

  &:checked {
    background-position: center center;
  }
`;

export const StyledLabel = styled.label`
  cursor: pointer;
  font: ${({ theme }) => `${theme.rem(14)} ${theme.fonts.font}`};
  user-select: none;
`;

export const StyledLabelLink = styled.a`
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;

export const StyledAgree = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.rem(25)};
`;
