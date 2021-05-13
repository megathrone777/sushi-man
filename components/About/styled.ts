import { styled } from "~/theme";

export const StyledWrapper = styled.section`
  background: url("/images/about_bg.jpg") center center/cover no-repeat;
  border-top: ${({ theme }) => theme.rem(10)} solid #da2628;
  padding: ${({ theme }) => theme.rem(50)} 0;
  min-height: ${({ theme }) => theme.rem(400)};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 0;
    padding: ${({ theme }) => theme.rem(25)} 0 ${({ theme }) => theme.rem(15)};
  }
`;

export const StyledTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.rem(30)};
  font: ${({ theme }) => theme.rem(40)} ${({ theme }) => theme.fonts.fontBlack};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.rem(25)};
    margin-bottom: ${({ theme }) => theme.rem(20)};
  }
`;

export const StyledText = styled.div`
  font-size: ${({ theme }) => theme.rem(20)};
  margin: 0 auto;
  max-width: ${({ theme }) => theme.rem(700)};
  letter-spacing: ${({ theme }) => theme.rem(1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.rem(17)};
    max-width: 80%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    letter-spacing: 0;
    max-width: 100%;
  }

  & > *,
  & > p {
    margin-bottom: ${({ theme }) => theme.rem(20)};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      margin-bottom: ${({ theme }) => theme.rem(15)};
    }
  }
`;
