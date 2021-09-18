import React, { useContext, useState } from "react";
import Link from "next/link";

import {
  AppContext,
  TCartProduct,
  changeQuantity,
  TAdditional,
  removeFromCart,
} from "~/store";
import { StyledContainer } from "~/components/Layout/styled";
import { SvgPlusIcon } from "~/icons";
import {
  StyledWrapper,
  StyledTable,
  StyledLayout,
  StyledTableCell,
  StyledTableRow,
  StyledBold,
  StyledTableCaption,
  StyledImage,
  StyledLink,
  StyledQuantityInput,
  StyledQuantityButton,
  StyledTotal,
  StyledSushiMan,
  StyledEmpty,
  StyledButtons,
  StyledBuy,
  StyledRemove,
  StyledQuantityWrapper,
  StyledQuantityLabel,
  StyledFooter,
  StyledDeliveryInput,
  StyledRadio,
  StyledRadioWrapper,
  StyledRadioLabel,
} from "./styled";
import { SvgMinusIcon } from "~/icons/SvgMinusIcon";

type TDeliveryPickup = "delivery" | "pickup";

const Cart: React.FC = () => {
  const [cutlery, setCutlery] = useState<string>("0");
  const [deliveryPickup, setDeliveryPickup] =
    useState<TDeliveryPickup>("delivery");
  const { dispatch, state } = useContext(AppContext);
  const { cart } = state;

  const addedProductsPrice: number[] = state.cart.products.map(
    ({ totalPrice }: TCartProduct) => totalPrice
  );

  const addedAdditionalsPrice: number[] = state.cart.additionals.map(
    ({ price, quantity = 0 }: TAdditional) => price * quantity
  );

  const totalProductsPrice = addedProductsPrice.reduce(
    (accumulator, currentPrice) => accumulator + currentPrice,
    0
  );

  const totalAdditionalsPrice = addedAdditionalsPrice.reduce(
    (accumulator, currentPrice) => accumulator + currentPrice,
    0
  );

  const totalPrice = totalProductsPrice + totalAdditionalsPrice;

  const handleQuantityIncrease = (id: number, quantity: number): void => {
    dispatch(changeQuantity(id, quantity + 1));
  };

  const handleQuantityDecrease = (id: number, quantity: number): void => {
    if (quantity === 1) return;
    dispatch(changeQuantity(id, quantity - 1));
  };

  const handleAdditionalQuantityIncrease = (id: number): void => {
    // dispatch(addAdditional(id, +currentTarget.value));
  };

  const handleAdditionalQuantityDecrease = (id: number): void => {
    // dispatch(addAdditional(id, +currentTarget.value));
  };

  const handleCutleryQuantityChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    if (+currentTarget.value > 15) {
      setCutlery("15");
      return;
    }
    setCutlery(currentTarget.value);
  };

  const handleDeliveryPickupChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    const name = currentTarget.value;

    setDeliveryPickup(name as TDeliveryPickup);
  };

  const handleProductRemove = (id: number): void => {
    dispatch(removeFromCart(id));
  };

  return (
    <StyledWrapper>
      <StyledContainer>
        {cart && !!cart.products.length ? (
          <>
            <StyledLayout>
              <StyledTable>
                <StyledTableCaption>Заказ</StyledTableCaption>
                <tbody>
                  {cart.products.map(
                    (
                      {
                        id,
                        title,
                        image,
                        weight,
                        price,
                        quantity,
                        totalPrice,
                      }: TCartProduct,
                      index: number
                    ): React.ReactElement => (
                      <StyledTableRow key={`${index}-${title}`}>
                        <StyledTableCell>
                          <Link
                            as={`/product/${id}`}
                            href={`/product/[${id}]`}
                            passHref
                          >
                            <StyledLink>
                              <StyledImage alt={title} src={image.url} />
                            </StyledLink>
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell>
                          <StyledBold>{title}</StyledBold>
                          <br />
                          {weight}
                        </StyledTableCell>
                        <StyledTableCell>
                          <StyledQuantityWrapper>
                            <StyledQuantityButton
                              isIncrease
                              onClick={() =>
                                handleQuantityIncrease(id, quantity)
                              }
                              type="button"
                            >
                              <SvgPlusIcon />
                            </StyledQuantityButton>
                            <StyledQuantityInput
                              min="1"
                              max="50"
                              type="number"
                              value={quantity ? quantity : 1}
                            />
                            <StyledQuantityButton
                              isDecrease
                              onClick={() =>
                                handleQuantityDecrease(id, quantity)
                              }
                              type="button"
                            >
                              <SvgMinusIcon />
                            </StyledQuantityButton>
                          </StyledQuantityWrapper>
                        </StyledTableCell>
                        <StyledTableCell>
                          <StyledBold>
                            {totalPrice ? `${totalPrice} Kč` : price}
                          </StyledBold>
                        </StyledTableCell>
                        <StyledTableCell>
                          <StyledRemove
                            onClick={() => handleProductRemove(id)}
                            type="button"
                          >
                            Удалить
                          </StyledRemove>
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  )}
                </tbody>
              </StyledTable>

              <StyledFooter>
                <StyledTable isSmall>
                  <StyledTableCaption>Доставка</StyledTableCaption>

                  <tbody>
                    <StyledTableRow>
                      <StyledTableCell>
                        <StyledRadioWrapper>
                          <StyledRadio
                            id="input-delivery"
                            name="delivery-pickup"
                            onChange={handleDeliveryPickupChange}
                            type="radio"
                            value="delivery"
                          />
                          <StyledRadioLabel htmlFor="input-delivery">
                            Доставка курьером
                          </StyledRadioLabel>
                        </StyledRadioWrapper>
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledRadioWrapper>
                          <StyledRadio
                            id="input-pickup"
                            name="delivery-pickup"
                            onChange={handleDeliveryPickupChange}
                            type="radio"
                            value="pickup"
                          />
                          <StyledRadioLabel htmlFor="input-pickup">
                            Самовывоз
                          </StyledRadioLabel>
                        </StyledRadioWrapper>
                      </StyledTableCell>
                    </StyledTableRow>

                    {deliveryPickup === "delivery" && (
                      <StyledTableRow>
                        <StyledTableCell colSpan={2}>
                          <StyledDeliveryInput
                            placeholder="Введите адрес"
                            type="text"
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </tbody>
                </StyledTable>

                {cart.additionals && !!cart.additionals.length && (
                  <StyledTable isSmall>
                    <StyledTableCaption>Дополнительно</StyledTableCaption>
                    <tbody>
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
                              <StyledBold>{title}</StyledBold>
                            </StyledTableCell>
                            <StyledTableCell>
                              <StyledQuantityWrapper>
                                <StyledQuantityButton
                                  isIncrease
                                  onClick={() =>
                                    handleAdditionalQuantityIncrease(
                                      additionalId
                                    )
                                  }
                                  type="button"
                                >
                                  <SvgPlusIcon />
                                </StyledQuantityButton>
                                <StyledQuantityInput
                                  min="1"
                                  max="50"
                                  onChange={() => {}}
                                  type="number"
                                  value={additionalQuantity}
                                />
                                <StyledQuantityButton
                                  isDecrease
                                  onClick={() =>
                                    handleAdditionalQuantityDecrease(
                                      additionalId
                                    )
                                  }
                                  type="button"
                                >
                                  <SvgMinusIcon />
                                </StyledQuantityButton>
                              </StyledQuantityWrapper>
                            </StyledTableCell>
                            <StyledTableCell>
                              <StyledBold>
                                {price * additionalQuantity} Kč
                              </StyledBold>
                            </StyledTableCell>
                          </StyledTableRow>
                        )
                      )}
                    </tbody>
                  </StyledTable>
                )}
              </StyledFooter>
            </StyledLayout>

            <StyledQuantityWrapper>
              <StyledQuantityLabel>Количество человек:*</StyledQuantityLabel>
              <StyledQuantityButton isIncrease onClick={() => {}} type="button">
                <SvgPlusIcon />
              </StyledQuantityButton>
              <StyledQuantityInput
                max="15"
                onChange={handleCutleryQuantityChange}
                type="number"
                value={cutlery}
              />
              <StyledQuantityButton isDecrease onClick={() => {}} type="button">
                <SvgMinusIcon />
              </StyledQuantityButton>
            </StyledQuantityWrapper>

            <StyledTotal>Общая цена: {totalPrice}</StyledTotal>
            <StyledButtons>
              <StyledBuy type="button">Купить</StyledBuy>
            </StyledButtons>
          </>
        ) : (
          <StyledEmpty>
            <StyledSushiMan alt="Sushi man" src="/images/sushi-man_img.jpg" />{" "}
            No products.
          </StyledEmpty>
        )}
      </StyledContainer>
    </StyledWrapper>
  );
};

export { Cart };
