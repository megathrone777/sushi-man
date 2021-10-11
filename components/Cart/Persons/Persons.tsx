import React, { useCallback, useEffect, useState } from "react";

import useTranslation from "~/intl/useTranslation";
import {
  setCutleryAmount,
  setCutleryTotalPrice,
  setTotalRollsDiscount,
  TCartProduct,
  useStore,
} from "~/store";
import { SvgPlusIcon, SvgMinusIcon, SvgExclamationIcon } from "~/icons";
import {
  StyledWrapper,
  StyledQuantityWrapper,
  StyledQuantityLabel,
  StyledQuantityButton,
  StyledQuantity,
  StyledText,
  StyledTextLabel,
  StyledTitle,
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
  }, [cutleryAmount, cutleryPrice, dispatch, totalPersons]);

  return (
    <StyledWrapper>
      <StyledTitle>{t("cutleryQuantity")}</StyledTitle>

      <StyledText>
        Do <StyledTextLabel>{totalPersons}</StyledTextLabel>{" "}
        {t("cutleryPriceIncluded")}
      </StyledText>

      <StyledQuantityWrapper>
        <StyledQuantityLabel>Příbory</StyledQuantityLabel>
        <StyledQuantityButton
          isDecrease
          onClick={handleQuantityDecrease}
          type="button"
        >
          <SvgMinusIcon />
        </StyledQuantityButton>
        <StyledQuantity hasError={totalPersonsError}>{amount}</StyledQuantity>
        <StyledQuantityButton
          isIncrease
          onClick={handleQuantityIncrease}
          type="button"
        >
          <SvgPlusIcon />
        </StyledQuantityButton>

        <StyledQuantityPrice>{cutleryTotalPrice} Kč</StyledQuantityPrice>
      </StyledQuantityWrapper>

      {totalPersonsError && (
        <StyledError>
          <StyledErrorIcon>
            <SvgExclamationIcon />
          </StyledErrorIcon>
        </StyledError>
      )}
    </StyledWrapper>
  );
};

export { Persons };
