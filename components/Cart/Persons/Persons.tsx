import React, { useEffect, useState } from "react";

import useTranslation from "~/intl/useTranslation";
import { setCutleryAmount, setCutleryTotalPrice, useStore } from "~/store";
import { SvgPlusIcon, SvgMinusIcon, SvgExclamationIcon } from "~/icons";
import {
  StyledWrapper,
  StyledQuantityWrapper,
  StyledQuantityButton,
  StyledQuantity,
  StyledName,
  StyledText,
  StyledTextLabel,
  StyledTitle,
  StyledTable,
  StyledTableRow,
  StyledTableCell,
  StyledQuantityPrice,
  StyledError,
  StyledErrorIcon,
} from "./styled";

const Persons: React.FC = () => {
  const { t } = useTranslation();
  const { dispatch, state } = useStore();
  const { cart } = state;
  const {
    cutleryPrice,
    cutleryAmount,
    cutleryTotalPrice,
    totalPersons,
    totalPersonsError,
  } = cart;
  const [amount, setAmount] = useState<number>(0);

  const handleQuantityIncrease = (): void => {
    setAmount((prevValue: number): number => {
      dispatch(setCutleryAmount(prevValue + 1));

      return prevValue + 1;
    });
  };

  const handleQuantityDecrease = (): void => {
    if (amount === 0) return;

    setAmount((prevValue: number): number => {
      dispatch(setCutleryAmount(prevValue - 1));

      return prevValue - 1;
    });
  };

  useEffect((): void => {
    if (cutleryAmount > totalPersons) {
      dispatch(
        setCutleryTotalPrice((cutleryAmount - totalPersons) * cutleryPrice)
      );
    } else {
      dispatch(setCutleryTotalPrice(0));
    }
  }, [cutleryAmount, cutleryPrice, totalPersons]);

  return (
    <StyledWrapper>
      <StyledTitle>{t("cutleryQuantity")}</StyledTitle>

      <StyledText>
        Do <StyledTextLabel>{totalPersons}</StyledTextLabel>{" "}
        {t("cutleryPriceIncluded")}
      </StyledText>

      <StyledTable>
        <StyledTableRow>
          <StyledTableCell>
            {totalPersonsError && (
              <StyledError>
                <StyledErrorIcon>
                  <SvgExclamationIcon />
                </StyledErrorIcon>
              </StyledError>
            )}
            <StyledName>Příbory</StyledName>
          </StyledTableCell>

          <StyledTableCell>
            <StyledQuantityWrapper>
              <StyledQuantityButton
                isDecrease
                onClick={handleQuantityDecrease}
                type="button"
              >
                <SvgMinusIcon />
              </StyledQuantityButton>
              <StyledQuantity hasError={totalPersonsError}>
                {amount}
              </StyledQuantity>
              <StyledQuantityButton
                isIncrease
                onClick={handleQuantityIncrease}
                type="button"
              >
                <SvgPlusIcon />
              </StyledQuantityButton>
            </StyledQuantityWrapper>
          </StyledTableCell>

          <StyledTableCell>
            <StyledQuantityPrice>{cutleryTotalPrice} Kč</StyledQuantityPrice>
          </StyledTableCell>
        </StyledTableRow>
      </StyledTable>
    </StyledWrapper>
  );
};

export { Persons };
