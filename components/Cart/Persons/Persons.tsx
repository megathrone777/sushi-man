import React, { useEffect } from "react";
import { useNotifications } from "reapop";

import useTranslation from "~/intl/useTranslation";
import {
  TCartProduct,
  setCutleryAmount,
  useStore,
  setCutleryAmountError,
} from "~/store";
import { SvgPlusIcon, SvgMinusIcon, SvgExclamationIcon } from "~/icons";
import {
  StyledWrapper,
  StyledQuantityWrapper,
  StyledQuantityButton,
  StyledQuantity,
  StyledName,
  StyledTitle,
  StyledTable,
  StyledTableRow,
  StyledTableCell,
  StyledError,
  StyledErrorIcon,
} from "./styled";

const Persons: React.FC = () => {
  const { notify } = useNotifications();
  const { t } = useTranslation();
  const { dispatch, store } = useStore();
  const { cart } = store;
  const { cutleryAmount, cutleryAmountError, products } = cart;

  const totalRollsAdded = products.filter(
    ({ isRoll }: TCartProduct): boolean => isRoll
  );

  const totalSetsAdded = products.filter(
    ({ isDrink, isSalat, isRoll }: TCartProduct): boolean =>
      !isRoll && !isDrink && !isSalat
  );

  const totalDrinksAdded = products.filter(
    ({ isDrink }: TCartProduct): boolean => isDrink
  );

  const totalSalatsAdded = products.filter(
    ({ isSalat }: TCartProduct): boolean => isSalat
  );

  const totalRollsAmount = totalRollsAdded.reduce(
    (accumulator: number, { quantity }: TCartProduct) => {
      return accumulator + quantity;
    },
    0
  );

  const totalSetsAmount = totalSetsAdded.reduce(
    (accumulator: number, { quantity }: TCartProduct) => {
      return accumulator + quantity;
    },
    0
  );

  const totalDrinksAmount = totalDrinksAdded.reduce(
    (accumulator: number, { quantity }: TCartProduct) => {
      return accumulator + quantity;
    },
    0
  );

  const totalSalatsAmount = totalSalatsAdded.reduce(
    (accumulator: number, { quantity }: TCartProduct) => {
      return accumulator + quantity;
    },
    0
  );

  const maxCutleryAmount =
    totalRollsAmount * 2 +
    totalSetsAmount * 4 +
    totalDrinksAmount * 0 +
    totalSalatsAmount * 2;

  const handleQuantityIncrease = (): void => {
    if (cutleryAmount >= maxCutleryAmount) {
      notify({
        dismissAfter: 3000,
        dismissible: true,
        position: "bottom-center",
        showDismissButton: true,
        status: "error",
        title: `Вы не можете добавить больше ${maxCutleryAmount} приборов`,
      });
      return;
    }

    dispatch(setCutleryAmountError(false));
    dispatch(setCutleryAmount(cutleryAmount + 1));
  };

  const handleQuantityDecrease = (): void => {
    if (cutleryAmount === 0) return;

    dispatch(setCutleryAmount(cutleryAmount - 1));
  };

  useEffect((): void => {
    dispatch(setCutleryAmount(0));
  }, [cart.products]);

  return (
    <StyledWrapper>
      <StyledTitle>{t("cutleryQuantity")}</StyledTitle>

      <StyledTable>
        <tbody>
          <StyledTableRow>
            <StyledTableCell>
              {cutleryAmountError && (
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
                <StyledQuantity>{cutleryAmount}</StyledQuantity>
                <StyledQuantityButton
                  isIncrease
                  onClick={handleQuantityIncrease}
                  type="button"
                >
                  <SvgPlusIcon />
                </StyledQuantityButton>
              </StyledQuantityWrapper>
            </StyledTableCell>

            <StyledTableCell />
          </StyledTableRow>
        </tbody>
      </StyledTable>
    </StyledWrapper>
  );
};

export { Persons };
