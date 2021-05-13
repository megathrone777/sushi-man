import { styled } from "~/theme";

export const StyledFooter = styled.footer`
  background-color: #eaeaed;
  border-top: ${({ theme }) => theme.rem(10)} solid #da2628;
  padding-top: ${({ theme }) => theme.rem(40)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.rem(20)};
  }
`;

export const StyledLayout = styled.div`
  display: block;
  text-align: center;
`;

export const StyledLogo = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(30)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.rem(17)};
  }
`;

export const StyledLogoLink = styled.a`
  cursor: pointer;
  display: inline-block;
  height: 100%;
`;

export const StyledLogoImage = styled.img``;

export const StyledMenu = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(18)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.rem(14)};
  }
`;

export const StyledMenuList = styled.ul`
  display: flex;
  justify-content: center;
`;

export const StyledMenuItem = styled.li`
  margin-right: ${({ theme }) => theme.rem(45)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-right: ${({ theme }) => theme.rem(30)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    margin-right: ${({ theme }) => theme.rem(18)};
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export const StyledMenuLink = styled.span`
  color: black;
  cursor: pointer;
  font-size: ${({ theme }) => theme.rem(20)};
  text-decoration: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.rem(18)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobileSm}) {
    font-size: ${({ theme }) => theme.rem(17)};
    text-align: center;
  }

  &:hover {
    color: #da2628;
  }
`;

export const StyledLink = styled.a`
  color: black;
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.rem(17)};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledCopy = styled.div`
  border-top: ${({ theme }) => theme.rem(1)} solid #9ea0a1;
  font-size: ${({ theme }) => theme.rem(19)};
  text-align: center;
  padding: ${({ theme }) => theme.rem(30)} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.rem(15)} 0;
  }
`;

export const StyledText = styled.p`
  font-size: ${({ theme }) => theme.rem(14)};
  margin-bottom: ${({ theme }) => theme.rem(10)};
`;

export const StyledEmail = styled.a`
  color: black;
  display: inline-block;
  font-size: ${({ theme }) => theme.rem(14)};
  margin-bottom: ${({ theme }) => theme.rem(10)};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const StyledCopyText = styled.p`
  font-size: ${({ theme }) => theme.rem(12)};
`;

export const StyledCopyLink = styled.a`
  color: #44d18e;
  text-decoration: none;
`;
