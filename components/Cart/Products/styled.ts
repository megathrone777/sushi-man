import { styled } from "~/theme";

export const StyledWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.rem(30)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.rem(15)};
  }
`;

export const StyledTitle = styled.h2`
  border-bottom: 3px solid #da2628;
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
  padding: ${({ theme }) => theme.rem(10)};
  text-align: left;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.rem(15)};
  }
`;

export const StyledContent = styled.div``;

export const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-areas: "image name quantity options";

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border: 2px solid rgb(239, 239, 239);
    border-radius: ${({ theme }) => theme.rem(7)};
    grid-template-columns: 50% 50%;
    grid-template-areas:
      "image name"
      "quantity options";
    margin-bottom: ${({ theme }) => theme.rem(15)};
  }
`;

const StyledCell = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.rem(10)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-bottom: ${({ theme }) => theme.rem(15)};
    padding-top: ${({ theme }) => theme.rem(15)};
  }
`;

export const StyledImageArea = styled(StyledCell)`
  grid-area: image;
`;

export const StyledNameArea = styled(StyledCell)`
  flex-direction: column;
  grid-area: name;
`;

export const StyledQuantityArea = styled(StyledCell)`
  grid-area: quantity;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background-color: rgb(239, 239, 239);
  }
`;

export const StyledOptionsArea = styled(StyledCell)`
  align-items: center;
  display: flex;
  grid-area: options;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background-color: rgb(239, 239, 239);
    flex-direction: column;
    justify-content: center;
  }
`;

export const StyledImage = styled.img`
  border-radius: ${({ theme }) => theme.rem(10)};
  display: block;
  height: auto;
  margin: 0 auto;
  overflow: hidden;
  width: ${({ theme }) => theme.rem(75)};
`;

export const StyledLink = styled.a`
  color: black;
  font-family: ${({ theme }) => theme.fonts.fontMedium};
  text-decoration: none;

  &:hover {
    color: #da2628;
  }
`;

export const StyledBold = styled.p`
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
`;

export const StyledWeight = styled.p``;

export const StyledQuantityWrapper = styled.div`
  align-items: center;
  display: inline-flex;
  position: relative;
  margin-right: 15px;
`;

export const StyledQuantityInput = styled.input`
  appearance: none;
  border: none;
  font: ${({ theme }) => `${theme.rem(18)} ${theme.fonts.fontBold}`};
  height: ${({ theme }) => theme.rem(30)};
  margin: 0 ${({ theme }) => theme.rem(0)};
  text-align: center;
  width: ${({ theme }) => theme.rem(50)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background-color: rgb(239, 239, 239);
  }

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
  padding: ${({ theme }) => theme.rem(2)};
  width: ${({ theme }) => theme.rem(22)};

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledPrice = styled.span`
  font: ${({ theme }) => `${theme.rem(20)} ${theme.fonts.fontBold}`};
  margin-right: ${({ theme }) => theme.rem(30)};
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-right: 0;
  }
`;

export const StyledRemove = styled.button`
  background: none;
  border: none;
  color: #da2628;
  cursor: pointer;
  font-size: ${({ theme }) => theme.rem(16)};

  &:hover {
    opacity: 0.8;
  }
`;
