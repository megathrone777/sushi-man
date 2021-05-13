import { styled } from "~/theme";

export const StyledWrapper = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.rem(5)};
  position: fixed;
  right: ${({ theme }) => theme.rem(200)};
  top: ${({ theme }) => theme.rem(150)};
  padding: ${({ theme }) => theme.rem(5)};
  text-align: center;
  width: ${({ theme }) => theme.rem(46)};
  z-index: 101;
`;

export const StyledLink = styled.a`
  cursor: pointer;
  display: block;
  position: absolute;
  height: 100%;
  width: 100%;
`;

export const StyledAmount = styled.p`
  white-space: nowrap;
`;

export const StyledClear = styled.button`
  cursor: pointer;
`;
