import React from "react";

import useTranslation from "~/intl/useTranslation";
import {
  TAdditional,
  changeAdditionalQuantity,
  useStore,
  setCustomerNote,
} from "~/store";
import { SvgPlusIcon, SvgMinusIcon, SvgNoteIcon } from "~/icons";
import {
  StyledWrapper,
  StyledTable,
  StyledTitle,
  StyledTableCell,
  StyledTableRow,
  StyledName,
  StyledPrice,
  StyledQuantityWrapper,
  StyledQuantityButton,
  StyledQuantity,
  StyledNoteWrapper,
  StyledNoteIcon,
  StyledNote,
  StyledNoteLabel,
} from "./styled";

const Additionals: React.FC = () => {
  const { t } = useTranslation();
  const { dispatch, store } = useStore();
  const { cart } = store;
  const { customerNote } = cart;

  const handleQuantityIncrease = (id: string, quantity: number): void => {
    dispatch(changeAdditionalQuantity(id, quantity + 1));
  };

  const handleQuantityDecrease = (id: string, quantity: number): void => {
    if (quantity === 0) return;
    dispatch(changeAdditionalQuantity(id, quantity - 1));
  };

  const handleNoteChange = (
    event: React.SyntheticEvent<HTMLTextAreaElement>
  ): void => {
    dispatch(setCustomerNote(event.currentTarget.value));
  };

  return (
    <StyledWrapper>
      <StyledTitle>{t("addMore")}</StyledTitle>

      <StyledTable>
        {cart.additionals && !!cart.additionals.length && (
          <tbody>
            <StyledTableRow>
              <StyledTableCell colSpan={3}>
                {t("priceIncluded")}
              </StyledTableCell>
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
                          handleQuantityDecrease(
                            additionalId,
                            additionalQuantity
                          )
                        }
                        type="button"
                      >
                        <SvgMinusIcon />
                      </StyledQuantityButton>
                      <StyledQuantity>{additionalQuantity}</StyledQuantity>
                      <StyledQuantityButton
                        isIncrease
                        onClick={() =>
                          handleQuantityIncrease(
                            additionalId,
                            additionalQuantity
                          )
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

      <StyledNoteLabel>Poznámka</StyledNoteLabel>

      <StyledNoteWrapper>
        <StyledNoteIcon>
          <SvgNoteIcon />
        </StyledNoteIcon>
      </StyledNoteWrapper>

      <StyledNote
        onChange={handleNoteChange}
        placeholder="Pokud si přejete vynechat sezam nebo pálivou omáčku, tak stačí napsat sem.."
        value={customerNote}
      />
    </StyledWrapper>
  );
};

export { Additionals };
