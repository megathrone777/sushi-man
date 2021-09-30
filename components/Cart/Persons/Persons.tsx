import React, { useCallback, useEffect, useState } from "react";
import { usePersistedContext } from "react-persist-context";

import useTranslation from "~/intl/useTranslation";
import {
  setCutleryAmount,
  setCutleryTotalPrice,
  setTotalRollsDiscount,
  TCartProduct,
} from "~/store";
import { SvgPlusIcon, SvgMinusIcon } from "~/icons";
import {
  StyledWrapper,
  StyledColumn,
  StyledQuantityWrapper,
  StyledQuantityButton,
  StyledQuantity,
  StyledText,
  StyledTextLabel,
  StyledQuantityLabel,
  StyledQuantityPrice,
} from "./styled";

const Persons: React.FC = () => {
  const { t } = useTranslation();
  const { dispatch, state } = usePersistedContext();
  const { cart } = state;
  const {
    cutleryPrice,
    cutleryAmount,
    cutleryTotalPrice,
    products,
    totalPersons,
  } = cart;
  const [amount, setAmount] = useState<number>(1);

  const checkRollsAdded = useCallback((): number => {
    const totalRollsAdded = products.filter(
      ({ isRoll }: TCartProduct): boolean => isRoll
    );

    const totalAmount = totalRollsAdded.reduce(
      (accumulator: number, { quantity }: TCartProduct) => {
        return accumulator + quantity;
      },
      0
    );

    return totalAmount;
  }, [products]);

  const handleQuantityIncrease = (): void => {
    setAmount((prevValue: number): number => {
      dispatch(setCutleryAmount(prevValue + 1));

      return prevValue + 1;
    });
  };

  const handleQuantityDecrease = (): void => {
    if (amount === 1) return;

    setAmount((prevValue: number): number => {
      dispatch(setCutleryAmount(prevValue - 1));

      return prevValue - 1;
    });
  };

  const renderDiscount = (): React.ReactElement => (
    <>
      {checkRollsAdded() > 0 && checkRollsAdded() % 4 === 0 ? (
        <StyledText>
          {t("discountReceived")}{" "}
          <StyledTextLabel>
            -
            {checkRollsAdded() % 4 === 0
              ? Math.floor(checkRollsAdded() / 4) * 50
              : 50}
            Kč
          </StyledTextLabel>
        </StyledText>
      ) : (
        <StyledText>
          {t("addMoreRolls")}{" "}
          {checkRollsAdded() > 0 ? 4 - (checkRollsAdded() % 4) : 4}{" "}
          {t("addMoreRollsResult")}
          <StyledTextLabel>
            {" "}
            {"-"}
            {checkRollsAdded() > 0 && checkRollsAdded() < 4
              ? 50
              : checkRollsAdded() > 0 && checkRollsAdded() % 4 === 0
              ? Math.floor(checkRollsAdded() / 4) * 50
              : checkRollsAdded() > 0 && checkRollsAdded() > 4
              ? Math.ceil(checkRollsAdded() / 4) * 50
              : 50}
            Kč
          </StyledTextLabel>
        </StyledText>
      )}
    </>
  );

  useEffect((): void => {
    dispatch(setTotalRollsDiscount(Math.floor(checkRollsAdded() / 4) * 50));

    if (cutleryAmount > totalPersons) {
      dispatch(
        setCutleryTotalPrice((cutleryAmount - totalPersons) * cutleryPrice)
      );
    } else {
      dispatch(setCutleryTotalPrice(0));
    }
  }, [cutleryAmount, cutleryPrice, dispatch, totalPersons, checkRollsAdded]);

  return (
    <StyledWrapper>
      <StyledColumn>
        <StyledQuantityWrapper>
          <StyledQuantityLabel>{t("cutleryQuantity")}</StyledQuantityLabel>

          <StyledQuantityButton
            isDecrease
            onClick={handleQuantityDecrease}
            type="button"
          >
            <SvgMinusIcon />
          </StyledQuantityButton>
          <StyledQuantity>{amount}</StyledQuantity>
          <StyledQuantityButton
            isIncrease
            onClick={handleQuantityIncrease}
            type="button"
          >
            <SvgPlusIcon />
          </StyledQuantityButton>
        </StyledQuantityWrapper>
        <StyledQuantityPrice>{cutleryTotalPrice} Kč</StyledQuantityPrice>
        <StyledText>
          Do <StyledTextLabel>{totalPersons}</StyledTextLabel>{" "}
          {t("cutleryPriceIncluded")}
        </StyledText>
      </StyledColumn>

      <StyledColumn>{renderDiscount()}</StyledColumn>
    </StyledWrapper>
  );
};

export { Persons };
