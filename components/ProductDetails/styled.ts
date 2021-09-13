import { css, styled } from "~/theme";

export const StyledWrapper = styled.div`
  background: url("/images/products_bg.jpg") center center repeat-y;
  border-bottom: ${({ theme }) => theme.rem(10)} solid #da2628;
  padding: ${({ theme }) => theme.rem(50)} 0 ${({ theme }) => theme.rem(100)};
  overflow: hidden;
`;

export const StyledLayout = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.rem(1200)};
`;

const StyledContentColumn = styled.div`
  padding: 0 ${({ theme }) => theme.rem(20)};
`;

export const StyledContentLeft = styled(StyledContentColumn)`
  flex: 0 1 35%;
  max-width: 35%;
`;
export const StyledContentRight = styled(StyledContentColumn)`
  flex: 0 1 65%;
  max-width: 65%;
`;

export const StyledContent = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(40)};
`;

export const StyledTitle = styled.h2`
  font: ${({ theme }) => `${theme.rem(40)} ${theme.fonts.fontSemiBold}`};
  margin-bottom: ${({ theme }) => theme.rem(20)};
`;

export const StyledItem = styled.p`
  margin-bottom: ${({ theme }) => theme.rem(15)};
  max-width: ${({ theme }) => theme.rem(450)};
`;

export const StyledItemPrice = styled.p`
  color: #da2629;
  font: ${({ theme }) => `${theme.rem(23)} ${theme.fonts.fontSemiBold}`};
  margin-bottom: ${({ theme }) => theme.rem(20)};
`;

export const StyledItemSecondary = styled.p`
  font-size: ${({ theme }) => theme.rem(14)};
  margin-bottom: ${({ theme }) => theme.rem(15)};
`;

export const StyledItemTitle = styled.span`
  color: black;
  font: ${({ theme }) => `${theme.rem(17)} ${theme.fonts.fontSemiBold}`};
  margin-right: ${({ theme }) => theme.rem(10)};
`;

export const StyledModifiers = styled.div``;

export const StyledModifiersList = styled.ul``;

export const StyledModifiersItem = styled.li`
  margin-bottom: ${({ theme }) => theme.rem(5)};
  user-select: none;
`;

export const StyledModifierLabel = styled.label`
  cursor: pointer;
`;

export const StyledMofifiersCheckbox = styled.input<{ isSecondary?: boolean }>`
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
  margin-left: 0;
  margin-right: ${({ theme }) => theme.rem(10)};
  overflow: hidden;
  vertical-align: middle;
  width: ${({ theme }) => theme.rem(25)};

  ${({ isSecondary }) =>
    isSecondary &&
    css`
      height: ${({ theme }) => theme.rem(20)};
      background-size: ${({ theme }) => `${theme.rem(13)} ${theme.rem(13)}`};
      width: ${({ theme }) => theme.rem(20)};
    `}

  &:checked {
    background-position: center center;
  }
`;

export const StyledSubmodifiersList = styled.ul`
  margin-left: ${({ theme }) => theme.rem(20)};
`;

export const StyledButton = styled.button`
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
