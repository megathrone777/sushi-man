import { styled } from "~/theme";

export const StyledWrapper = styled.div`
  width: 45%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.rem(40)};
    width: 100%;
  }
`;

export const StyledTitle = styled.h2`
  border-bottom: ${({ theme }) => theme.rem(3)} solid #da2628;
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
  padding: ${({ theme }) => theme.rem(10)};
  margin-bottom: ${({ theme }) => theme.rem(15)};
`;

export const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const StyledImage = styled.img`
  height: ${({ theme }) => theme.rem(40)};
  margin-left: ${({ theme }) => theme.rem(40)};
  margin-top: ${({ theme }) => theme.rem(10)};
  width: auto;
`;

export const StyledColumn = styled.div``;

export const StyledRadioWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-right: ${({ theme }) => theme.rem(30)};
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
  min-width: ${({ theme }) => theme.rem(25)};
  width: ${({ theme }) => theme.rem(25)};

  &:checked {
    background-position: center center;
  }
`;

export const StyledRadioLabel = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-family: ${({ theme }) => theme.fonts.fontMedium};
  min-height: ${({ theme }) => theme.rem(38)};
`;
