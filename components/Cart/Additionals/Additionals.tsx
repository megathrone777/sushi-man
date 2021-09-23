import React, { useContext } from "react";

import useTranslation from "~/intl/useTranslation";
import { AppContext, TAdditional, changeAdditionalQuantity } from "~/store";
import { SvgPlusIcon, SvgMinusIcon } from "~/icons";
import {
  StyledTable,
  StyledTableCaption,
  StyledTableCell,
  StyledTableRow,
  StyledName,
  StyledPrice,
  StyledQuantityWrapper,
  StyledQuantityButton,
  StyledQuantity,
} from "./styled";

const Additionals: React.FC = () => {
  const { t } = useTranslation();
  const { dispatch, state } = useContext(AppContext);
  const { cart } = state;

  const handleQuantityIncrease = (id: number, quantity: number): void => {
    dispatch(changeAdditionalQuantity(id, quantity + 1));
  };

  const handleQuantityDecrease = (id: number, quantity: number): void => {
    if (quantity === 0) return;
    dispatch(changeAdditionalQuantity(id, quantity - 1));
  };

  return (
    <StyledTable>
      <StyledTableCaption>{t("addMore")}</StyledTableCaption>

      {cart.additionals && !!cart.additionals.length && (
        <tbody>
          <StyledTableRow>
            <StyledTableCell colSpan={3}>{t('priceIncluded')}</StyledTableCell>
          </StyledTableRow>
          {cart.additionals.map(
            (
              {
                id: additionalId,
                title,
                quantity: additionalQuantity = 0,
                price,
              }: TAdditional,
              index: number
            ): React.ReactElement => (
              <StyledTableRow key={`${index}-${title}`}>
                <StyledTableCell>
                  <StyledName>{title}</StyledName>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledQuantityWrapper>
                    <StyledQuantityButton
                      isDecrease
                      onClick={() =>
                        handleQuantityDecrease(additionalId, additionalQuantity)
                      }
                      type="button"
                    >
                      <SvgMinusIcon />
                    </StyledQuantityButton>
                    <StyledQuantity>{additionalQuantity}</StyledQuantity>
                    <StyledQuantityButton
                      isIncrease
                      onClick={() =>
                        handleQuantityIncrease(additionalId, additionalQuantity)
                      }
                      type="button"
                    >
                      <SvgPlusIcon />
                    </StyledQuantityButton>
                  </StyledQuantityWrapper>
                </StyledTableCell>

                <StyledTableCell>
                  <StyledPrice>{price * additionalQuantity} Kč</StyledPrice>
                </StyledTableCell>
              </StyledTableRow>
            )
          )}
        </tbody>
      )}
    </StyledTable>
  );
};

export { Additionals };
