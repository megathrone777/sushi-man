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
import { SvgPlusIcon, SvgMinusIcon } from "~/icons";
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
  StyledPrice,
  StyledEmpty,
  StyledButtons,
  StyledBuy,
  StyledRemove,
  StyledQuantityWrapper,
  StyledQuantityLabel,
  StyledQuantityPrice,
  StyledFooter,
  StyledDelivery,
  StyledDeliveryTitle,
  StyledDeliveryHeader,
  StyledDeliveryContent,
  StyledDeliveryLayout,
  StyledDeliveryInputWrapper,
  StyledPhoneInput,
  StyledNameInput,
  StyledDeliveryInput,
  StyledRadio,
  StyledRadioWrapper,
  StyledRadioLabel,
  StyledPayment,
  StyledPaymentColumn,
  StyledPaymentHeader,
  StyledPaymentImage,
  StyledPaymentTitle,
  StyledPersons,
  StyledPersonsColumn,
  StyledPersonsText,
  StyledPersonsTextLabel,
  StyledAdditionalName,
  StyledDeliveryPickup,
  StyledDeliveryPickupLabel,
} from "./styled";

type TDeliveryPickup = "delivery" | "pickup";
type TPayment = "card" | "cash";

const Cart: React.FC = () => {
  const [cutlery, setCutlery] = useState<string>("0");
  const [deliveryPickup, setDeliveryPickup] =
    useState<TDeliveryPickup>("delivery");
  const [payment, setPayment] = useState("card");
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

  const handlePaymentChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    const name = currentTarget.value;

    setPayment(name as TPayment);
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
                          <StyledPrice>
                            {totalPrice ? `${totalPrice} Kč` : price}
                          </StyledPrice>
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

              <StyledPersons>
                <StyledPersonsColumn>
                  <StyledQuantityWrapper>
                    <StyledQuantityLabel>
                      Количество человек:*
                    </StyledQuantityLabel>
                    <StyledQuantityButton
                      isIncrease
                      onClick={() => {}}
                      type="button"
                    >
                      <SvgPlusIcon />
                    </StyledQuantityButton>
                    <StyledQuantityInput
                      max="15"
                      onChange={handleCutleryQuantityChange}
                      type="number"
                      value={cutlery}
                    />
                    <StyledQuantityButton
                      isDecrease
                      onClick={() => {}}
                      type="button"
                    >
                      <SvgMinusIcon />
                    </StyledQuantityButton>
                  </StyledQuantityWrapper>
                  <StyledQuantityPrice>0 Kc</StyledQuantityPrice>
                  <StyledPersonsText>
                    До 3-х человек уже в цене
                  </StyledPersonsText>
                </StyledPersonsColumn>

                <StyledPersonsColumn>
                  <StyledPersonsText>
                    Добавьте ещё 1,2 ролла и получите{" "}
                    <StyledPersonsTextLabel>-50Kč</StyledPersonsTextLabel>
                  </StyledPersonsText>
                </StyledPersonsColumn>
              </StyledPersons>

              <StyledFooter>
                <StyledDelivery>
                  <StyledDeliveryTitle>Доставка</StyledDeliveryTitle>
                  <StyledDeliveryHeader>
                    <StyledRadioWrapper>
                      <StyledRadio
                        checked={deliveryPickup === "delivery"}
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
                  </StyledDeliveryHeader>

                  <StyledDeliveryLayout>
                    {deliveryPickup === "delivery" && (
                      <StyledDeliveryContent
                        isVisible={deliveryPickup === "delivery"}
                      >
                        <StyledDeliveryInputWrapper>
                          <StyledNameInput placeholder="Имя" type="text" />
                        </StyledDeliveryInputWrapper>

                        <StyledDeliveryInputWrapper>
                          <StyledPhoneInput placeholder="Телефон" type="tel" />
                        </StyledDeliveryInputWrapper>

                        <StyledDeliveryInputWrapper>
                          <StyledDeliveryInput
                            placeholder="Введите адрес"
                            type="text"
                          />
                        </StyledDeliveryInputWrapper>
                      </StyledDeliveryContent>
                    )}

                    {deliveryPickup === "pickup" && (
                      <StyledDeliveryContent
                        isVisible={deliveryPickup === "pickup"}
                      >
                        <StyledDeliveryInputWrapper>
                          <StyledNameInput placeholder="Имя" type="text" />
                        </StyledDeliveryInputWrapper>

                        <StyledDeliveryInputWrapper>
                          <StyledPhoneInput placeholder="Телефон" type="tel" />
                        </StyledDeliveryInputWrapper>

                        <StyledDeliveryPickup>
                          <StyledDeliveryPickupLabel>
                            Адрес для самовывоза:
                          </StyledDeliveryPickupLabel>
                          <StyledLink
                            href="https://goo.gl/maps/r6Tf6xHVnu59bD9J9"
                            target="_blank"
                          >
                            Husitská 187/60, Praha 3
                          </StyledLink>
                        </StyledDeliveryPickup>
                      </StyledDeliveryContent>
                    )}
                  </StyledDeliveryLayout>
                </StyledDelivery>

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
                              <StyledAdditionalName>
                                {title}
                              </StyledAdditionalName>
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
                              <StyledPrice>
                                {price * additionalQuantity} Kč
                              </StyledPrice>
                            </StyledTableCell>
                          </StyledTableRow>
                        )
                      )}
                    </tbody>
                  </StyledTable>
                )}
              </StyledFooter>
            </StyledLayout>

            <StyledPayment>
              <StyledPaymentTitle>Оплата</StyledPaymentTitle>

              <StyledPaymentHeader>
                <StyledPaymentColumn>
                  <StyledRadioWrapper>
                    <StyledRadio
                      checked={payment === "card"}
                      id="input-card"
                      name="input-payment"
                      onChange={handlePaymentChange}
                      type="radio"
                      value="card"
                    />
                    <StyledRadioLabel htmlFor="input-card">
                      Картой на месте или онлайн
                    </StyledRadioLabel>
                  </StyledRadioWrapper>

                  <StyledPaymentImage
                    alt="Card"
                    src="/images/payments_img.png"
                  />
                </StyledPaymentColumn>

                <StyledPaymentColumn>
                  <StyledRadioWrapper>
                    <StyledRadio
                      id="input-cash"
                      name="input-payment"
                      onChange={handlePaymentChange}
                      type="radio"
                      value="cash"
                    />
                    <StyledRadioLabel htmlFor="input-cash">
                      Наличными
                    </StyledRadioLabel>
                  </StyledRadioWrapper>

                  <StyledPaymentImage alt="Card" src="/images/cash_img.jpg" />
                </StyledPaymentColumn>
              </StyledPaymentHeader>
            </StyledPayment>

            <StyledTotal>Общая цена: {totalPrice} Kč</StyledTotal>
            <StyledButtons>
              <StyledBuy type="button">Перейти к оплате</StyledBuy>
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
