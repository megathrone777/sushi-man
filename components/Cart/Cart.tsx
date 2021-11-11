import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useNotifications } from "reapop";
import Link from "next/link";
import { gql, useMutation } from "@apollo/client";
import fetch from "isomorphic-unfetch";

import client from "~/apollo-client";
import useTranslation from "~/intl/useTranslation";
import {
  TCartProduct,
  TAdditional,
  useStore,
  setCustomerAddressError,
  setCustomerNameError,
  setCustomerPhoneError,
  setTotalPersonsError,
} from "~/store";
import { Additionals } from "./Additionals";
import { Delivery } from "./Delivery";
import { Payment } from "./Payment";
import { Products } from "./Products";
import { Persons } from "./Persons";
import { StyledContainer } from "~/components/Layout/styled";
import {
  StyledWrapper,
  StyledTotal,
  StyledEmptyImage,
  StyledEmpty,
  StyledButtons,
  StyledBuy,
  StyledLayout,
  StyledCheckbox,
  StyledAgree,
  StyledLabel,
  StyledLabelLink,
  StyledColumn,
  StyledTitle,
  StyledText,
  StyledTextPrice,
} from "./styled";

const Cart: React.FC = () => {
  const router = useRouter();
  const { notify } = useNotifications();
  const { t } = useTranslation();
  const { dispatch, state } = useStore();
  const [submitOrder, { loading: submitOrderLoading }] = useMutation(
    gql`
      mutation Mutation($createOrderInput: createOrderInput) {
        createOrder(input: $createOrderInput) {
          order {
            id
            name
            price
          }
        }
      }
    `,
    {
      client,
      onCompleted: (data) => {
        fetch("/api/cart/order", {
          method: "POST",
          body: JSON.stringify({
            orderId: data["createOrder"]["order"]["id"],
            orderPrice: data["createOrder"]["order"]["price"],
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
          });
      },
    }
  );
  // const [updateOrder, { loading: updateOrderLoading }] = useMutation(
  //   gql`
  //     mutation Mutation($updateOrderInput: updateOrderInput) {
  //       createOrder(input: $createOrderInput) {
  //         order {
  //           comgatePaymentStatus
  //         }
  //       }
  //     }
  //   `,
  //   {
  //     client,
  //     onCompleted: (data) => {
  //       console.log(data);
  //     },
  //   }
  // );
  const { cart } = state;
  const {
    cutleryTotalPrice,
    isPickupChecked,
    totalRollsDiscount,
    deliveryPrice,
    customerAddress,
    customerName,
    customerPhone,
    cutleryAmount,
  } = cart;

  const addedProductsPrice: number[] = state.cart.products.map(
    ({ totalPrice }: TCartProduct): number => totalPrice
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

  const totalPrice =
    totalProductsPrice +
    totalAdditionalsPrice +
    cutleryTotalPrice +
    (isPickupChecked ? -50 : 0) -
    totalRollsDiscount +
    deliveryPrice;

  const checkCartFields = (): boolean => {
    if (isPickupChecked && totalPrice < 150) {
      notify({
        dismissAfter: 3000,
        dismissible: true,
        position: "bottom-center",
        showDismissButton: true,
        status: "error",
        title: `Minimální cena objednávky při vyzvednutí - 150 Kč`,
      });
      return;
    }

    if (!isPickupChecked && deliveryPrice === 0 && totalPrice < 250) {
      notify({
        dismissAfter: 3000,
        dismissible: true,
        position: "bottom-center",
        showDismissButton: true,
        status: "error",
        title: `Minimální cena objednávky do 3km. - 250 Kč (bez ceny dopravy)`,
      });
      return;
    }

    if (
      !isPickupChecked &&
      deliveryPrice >= 50 &&
      totalPrice - deliveryPrice < 300
    ) {
      notify({
        dismissAfter: 3000,
        dismissible: true,
        position: "bottom-center",
        showDismissButton: true,
        status: "error",
        title: `Minimální cena objednávky od 3km. - 300 Kč (bez ceny dopravy)`,
      });
      return;
    }

    if (customerAddress.length === 0) {
      dispatch(setCustomerAddressError(true));
    } else {
      dispatch(setCustomerAddressError(false));
    }

    if (customerName.length === 0) {
      dispatch(setCustomerNameError(true));
    } else {
      dispatch(setCustomerNameError(false));
    }

    if (customerPhone.length === 0) {
      dispatch(setCustomerPhoneError(true));
    } else {
      dispatch(setCustomerPhoneError(false));
    }

    if (cutleryAmount === 0) {
      dispatch(setTotalPersonsError(true));
    } else {
      dispatch(setTotalPersonsError(false));
    }

    if (
      customerPhone.length === 0 ||
      customerName.length === 0 ||
      customerAddress.length === 0 ||
      cutleryAmount === 0
    ) {
      notify({
        dismissAfter: 3000,
        dismissible: true,
        position: "bottom-center",
        showDismissButton: true,
        status: "error",
        title: `Vyplňte povinné údaje`,
      });
      return false;
    }

    return true;
  };

  const handleBuyClick = (
    name: string,
    comgateTransId: string,
    price: number
  ): void => {
    if (checkCartFields()) {
      submitOrder({
        variables: {
          createOrderInput: {
            data: {
              comgateTransId,
              name,
              price,
            },
          },
        },
      });
    }
  };

  useEffect((): void => {
    router.replace(
      {
        pathname: location.pathname,
        query: {},
      },
      undefined,
      { scroll: false }
    );
  }, []);

  return (
    <StyledWrapper>
      {submitOrderLoading && <p>Loading...</p>}
      <StyledContainer>
        {cart && !!cart.products.length ? (
          <>
            <Products />

            <StyledLayout>
              <StyledColumn>
                <Delivery />
                <StyledTitle>Podmínky</StyledTitle>
                <StyledText>
                  Minimální cena objednávky do 3km. -{" "}
                  <StyledTextPrice>250 Kč</StyledTextPrice>
                </StyledText>
                <StyledText>
                  Minimální cena objednávky od 3km. -{" "}
                  <StyledTextPrice>300 Kč</StyledTextPrice>
                </StyledText>
                <StyledText>
                  Minimální cena objednávky při vyzvednutí -{" "}
                  <StyledTextPrice>150 Kč</StyledTextPrice>
                </StyledText>
              </StyledColumn>

              <StyledColumn>
                <Persons />
                <Additionals />
                <Payment />
              </StyledColumn>
            </StyledLayout>

            <StyledAgree>
              <StyledCheckbox id="agree" type="checkbox" />
              <StyledLabel htmlFor="agree">
                Souhlasíte s zpracováním a uchováním{" "}
                <Link href="/rules" passHref>
                  <StyledLabelLink>
                    zásady ochrany osobních údajů
                  </StyledLabelLink>
                </Link>
              </StyledLabel>
            </StyledAgree>
            <StyledTotal>
              {t("priceTotal")}: {totalPrice} Kč
            </StyledTotal>

            <StyledButtons>
              <StyledBuy
                onClick={() => handleBuyClick("New order", "", totalPrice)}
                type="button"
              >
                {t("goToPay")}
              </StyledBuy>
            </StyledButtons>
          </>
        ) : (
          <StyledEmpty>
            <StyledEmptyImage alt="Sushi man" src="/images/sushi-man_img.jpg" />{" "}
            {t("cartIsEmpty")}
          </StyledEmpty>
        )}
      </StyledContainer>
    </StyledWrapper>
  );
};

export { Cart };
