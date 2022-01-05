import React from "react";

import useTranslation from "~/intl/useTranslation";
import {
  TAdditional,
  changeAdditionalQuantity,
  useStore,
  setCustomerNote,
  setPromoCode,
  setPromoSuccess,
  setPromoError,
  setPromoDiscount,
} from "~/store";
import {
  SvgPlusIcon,
  SvgMinusIcon,
  SvgNoteIcon,
  // SvgCheckIcon,
  // SvgExclamationIcon,
  // SvgCrossIcon,
} from "~/icons";
import {
  StyledWrapper,
  StyledLayout,
  StyledContent,
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
  StyledNoteContent,
  StyledNoteIcon,
  StyledNote,
  StyledNoteLabel,
  // StyledPromo,
  // StyledPromoInput,
  // StyledPromoButton,
  // StyledPromoSuccess,
  // StyledPromoError,
} from "./styled";

const Additionals: React.FC = () => {
  const { t } = useTranslation();
  const { dispatch, store } = useStore();
  const { cart } = store;
  const { customerNote, promoCode } = cart;

  const handleQuantityIncrease = (id: string, quantity: number): void => {
    dispatch(changeAdditionalQuantity(id, quantity + 1));
  };

  const handleQuantityDecrease = (id: string, quantity: number): void => {
    if (quantity === 0) return;
    dispatch(changeAdditionalQuantity(id, quantity - 1));
  };

  // const handlePromoChange = ({
  //   currentTarget,
  // }: React.SyntheticEvent<HTMLInputElement>): void => {
  //   dispatch(setPromoCode(currentTarget.value));
  // };

  // const handlePromoSubmit = (): void => {
  //   fetch("/api/cart/promoCode", {
  //     body: JSON.stringify({
  //       promoCode,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.statusCode === 200) {
  //         dispatch(setPromoSuccess(true));
  //         dispatch(setPromoDiscount(data.discount));
  //         dispatch(setPromoError(false));
  //       } else {
  //         dispatch(setPromoError(true));
  //         dispatch(setPromoDiscount(0));
  //         dispatch(setPromoSuccess(false));
  //       }
  //     });
  // };

  const handleNoteChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLTextAreaElement>): void => {
    if (currentTarget.value.length > 250) {
      return;
    }
    dispatch(setCustomerNote(currentTarget.value));
  };

  return (
    <StyledWrapper>
      <StyledLayout>
        <StyledContent>
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
                        <StyledPrice>
                          {price * additionalQuantity} Kč
                        </StyledPrice>
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                )}
              </tbody>
            )}
          </StyledTable>
        </StyledContent>

        <StyledNoteWrapper>
          <StyledNoteLabel>Poznámka</StyledNoteLabel>

          <StyledNoteContent>
            <StyledNoteIcon>
              <SvgNoteIcon />
            </StyledNoteIcon>
          </StyledNoteContent>

          <StyledNote
            maxLength={250}
            onChange={handleNoteChange}
            placeholder="Pokud si přejete vynechat sezam nebo pálivou omáčku, tak stačí napsat sem.."
            value={customerNote}
          />
        </StyledNoteWrapper>

        {/* <StyledTitle>{t("promoTitle")}</StyledTitle>
        <StyledPromo>
          <StyledPromoInput
            onChange={handlePromoChange}
            placeholder="Promo code"
            type="text"
            value={promoCode}
          />

          {promoCodeSuccess && (
            <StyledPromoSuccess>
              <SvgCheckIcon />
            </StyledPromoSuccess>
          )}

          {promoCodeError && (
            <StyledPromoError>
              <SvgCrossIcon />
            </StyledPromoError>
          )}

          <StyledPromoButton onClick={handlePromoSubmit} type="button">
            Použit
          </StyledPromoButton>
        </StyledPromo> */}
      </StyledLayout>
    </StyledWrapper>
  );
};

export { Additionals };
