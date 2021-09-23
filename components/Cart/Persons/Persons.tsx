import React, { useCallback, useContext, useEffect, useState } from "react";

import useTranslation from "~/intl/useTranslation";
import {
  AppContext,
  setCutleryAmount,
  setCutleryTotalPrice,
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
  const { dispatch, state } = useContext(AppContext);
  const { cart, cutleryPrice } = state;
  const { cutleryAmount, cutleryTotalPrice, products, totalPersons } = cart;
  const [amount, setAmount] = useState<number>(1);

  const checkRollsAdded = useCallback((): number => {
    const totalRollsAdded = products.filter(
      ({ isRoll }: TCartProduct): boolean => isRoll
    );

    const totalAmount = totalRollsAdded.reduce(
      (accumulator, { quantity }: TCartProduct) => {
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
      {checkRollsAdded() % 4 === 0 ? (
        <StyledText>
          {t("discountReceived")}{" "}
          <StyledTextLabel>
            -{Math.ceil(checkRollsAdded() / 4) * 50}Kč
          </StyledTextLabel>
        </StyledText>
      ) : (
        <StyledText>
          {t("addMoreRolls")} {4 - (checkRollsAdded() % 4)}{" "}
          {t("addMoreRollsResult")}{" "}
          <StyledTextLabel>
            -{Math.ceil(checkRollsAdded() / 4) * 50}Kč
          </StyledTextLabel>
        </StyledText>
      )}
    </>
  );

  // useCallback(() => {
  //   if (checkRollsAdded() % 4 === 0) {
  //     notify({
  //       dismissAfter: 3000,
  //       dismissible: true,
  //       position: "bottom-center",
  //       showDismissButton: true,
  //       status: "success",
  //       title: `Вы получили скидку -${Math.ceil(checkRollsAdded() / 4) * 50}`,
  //     });
  //   }
  // }, [checkRollsAdded, notify]);

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
      <StyledColumn>
        <StyledQuantityWrapper>
          <StyledQuantityLabel>{t("cutleryQuantity")}:</StyledQuantityLabel>

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
        <StyledQuantityPrice>{cutleryTotalPrice} Kc</StyledQuantityPrice>
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
