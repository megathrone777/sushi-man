import { styled } from "~/theme";

export const StyledWrapper = styled.div`
  margin-right: ${({ theme }) => theme.rem(60)};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-right: 0;
  }
`;

export const StyledList = styled.ul`
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledItem = styled.li`
  margin-right: ${({ theme }) => theme.rem(60)};

  &:last-of-type {
    margin-right: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-right: ${({ theme }) => theme.rem(40)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.rem(15)};
    margin-right: 0;
  }
`;

export const StyledLink = styled.span`
  color: black;
  cursor: pointer;
  font-size: ${({ theme }) => theme.rem(20)};
  text-decoration: none;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.rem(18)};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    color: black;
    font-size: ${({ theme }) => theme.rem(28)};
  }

  &:hover {
    color: #da2628;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      color: black;
    }
  }
`;
