import React, { useEffect, useState } from "react";
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
  setAgree,
  setAgreeError,
  setCutleryAmountError,
  setCustomerAddressError,
  setCustomerNameError,
  setCustomerPhoneError,
  setCustomerEmailError,
} from "~/store";
import { Additionals } from "./Additionals";
import { Delivery } from "./Delivery";
import { Payment } from "./Payment";
import { Products } from "./Products";
import { Persons } from "./Persons";
import { SvgLoaderIcon, SvgExclamationIcon } from "~/icons";
import { StyledContainer } from "~/components/Layout/styled";
import {
  StyledWrapper,
  StyledTotal,
  StyledEmptyImage,
  StyledEmpty,
  StyledButtons,
  StyledBuy,
  StyledBuyLoader,
  StyledLayout,
  StyledCheckbox,
  StyledAgree,
  StyledLabel,
  StyledLabelLink,
  StyledColumn,
  StyledTitle,
  StyledText,
  StyledTextPrice,
  StyledErrorIcon,
} from "./styled";

const createOrderMutation = gql`
  mutation CreateOrderMutation($createOrderInput: createOrderInput) {
    createOrder(input: $createOrderInput) {
      order {
        id
        price
      }
    }
  }
`;

const Cart: React.FC = () => {
  const router = useRouter();
  const [submitOrderLoading, toggleSubmitOrderLoading] =
    useState<boolean>(false);
  const { notify } = useNotifications();
  const { t } = useTranslation();
  const { dispatch, store } = useStore();
  const { cart } = store;
  const {
    additionals,
    isAgreeChecked,
    isAgreeCheckedError,
    isPickupChecked,
    totalRollsDiscount,
    deliveryPrice,
    deliveryError,
    cutleryAmount,
    customerAddress,
    customerName,
    customerPhone,
    customerEmail,
    customerNote,
    paymentType,
    products,
  } = cart;
  const selectedAdditionals = additionals.filter(
    ({ quantity }: TAdditional) => quantity !== undefined && quantity !== 0
  );

  const [createOrderByCard] = useMutation(createOrderMutation, {
    client,
    onCompleted: (data) => {
      fetch("/api/cart/order", {
        method: "POST",
        body: JSON.stringify({
          additionals: selectedAdditionals,
          address: customerAddress,
          cutleryAmount,
          deliveryPrice,
          name: customerName,
          phone: customerPhone,
          email: customerEmail,
          note: customerNote,
          orderId: data["createOrder"]["order"]["id"],
          orderPrice: data["createOrder"]["order"]["price"],
          paymentType,
          products,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.text())
        .then((data) => {
          router.push(JSON.parse(data).redirect);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          toggleSubmitOrderLoading(false);
        });
    },
    onError: (error) => {
      console.log("create", error);
      alert("Cannot create order card");
    },
  });

  const [createOrderByCash] = useMutation(createOrderMutation, {
    client,
    onCompleted: (data) => {
      fetch("/api/cart/order", {
        method: "POST",
        body: JSON.stringify({
          additionals: selectedAdditionals,
          address: customerAddress,
          cutleryAmount,
          deliveryPrice,
          name: customerName,
          phone: customerPhone,
          email: customerEmail,
          note: customerNote,
          orderId: data["createOrder"]["order"]["id"],
          orderPrice: data["createOrder"]["order"]["price"],
          paymentType,
          products,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.text())
        .then((data) => {
          router.push(JSON.parse(data).redirect);
        })
        .finally(() => {
          toggleSubmitOrderLoading(false);
        });
    },
    onError: () => {
      alert("Cannot create order");
    },
  });

  const addedProductsPrice: number[] = cart.products.map(
    ({ totalPrice }: TCartProduct): number => totalPrice
  );

  const addedAdditionalsPrice: number[] = cart.additionals.map(
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
    deliveryPrice -
    totalRollsDiscount;

  const totalOrderPrice =
    totalPrice - (isPickupChecked && totalPrice > 350 ? 50 : 0);

  const checkCartFields = (): boolean => {
    if (isPickupChecked && totalPrice < 150) {
      notify({
        dismissAfter: 3000,
        dismissible: true,
        position: "bottom-center",
        showDismissButton: true,
        status: "error",
        title: `Min. cena objednávky při vyzvednutí - 150 Kč`,
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
        title: `Min. cena objednávky do 3km. - 250 Kč (bez ceny dopravy)`,
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
        title: `Min. cena objednávky od 3km. - 300 Kč (bez ceny dopravy)`,
      });
      return;
    }

    if (!isAgreeChecked) {
      dispatch(setAgreeError(true));
    } else {
      dispatch(setAgreeError(false));
    }

    if (cutleryAmount === 0) {
      dispatch(setCutleryAmountError(true));
    } else {
      dispatch(setCutleryAmountError(false));
    }

    if (customerAddress.length === 0 && !isPickupChecked) {
      dispatch(setCustomerAddressError(true));
    } else {
      dispatch(setCustomerAddressError(false));
    }

    if (customerEmail.length === 0) {
      dispatch(setCustomerEmailError(true));
    } else {
      dispatch(setCustomerEmailError(false));
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

    if (
      deliveryError ||
      customerPhone.length === 0 ||
      customerName.length === 0 ||
      customerEmail.length === 0 ||
      cutleryAmount === 0 ||
      (customerAddress.length === 0 && !isPickupChecked) ||
      !isAgreeChecked
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

  const handleAgreeChange = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    if (currentTarget.checked) {
      dispatch(setAgreeError(false));
    }

    dispatch(setAgree(currentTarget.checked));
  };

  const handleBuyClick = (
    name: string,
    comgateTransId: string,
    price: number
  ): void => {
    if (checkCartFields()) {
      toggleSubmitOrderLoading(true);

      const createOrderInput = {
        data: {
          address: customerAddress,
          additionals: selectedAdditionals,
          cutleryAmount,
          comgateTransId,
          deliveryPrice,
          email: customerEmail,
          phone: customerPhone,
          name,
          note: customerNote,
          paymentType,
          price,
          products,
        },
      };

      if (paymentType === "cash") {
        createOrderByCash({
          variables: {
            createOrderInput,
          },
        });
        return;
      }

      createOrderByCard({
        variables: {
          createOrderInput,
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
              {isAgreeCheckedError && (
                <StyledErrorIcon>
                  <SvgExclamationIcon />
                </StyledErrorIcon>
              )}

              <StyledCheckbox
                checked={isAgreeChecked}
                id="agree"
                onChange={handleAgreeChange}
                type="checkbox"
              />
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
              {t("priceTotal")}: {totalOrderPrice} Kč
            </StyledTotal>

            <StyledButtons>
              <StyledBuy
                isLoading={submitOrderLoading}
                onClick={() =>
                  handleBuyClick(customerName, "", totalOrderPrice)
                }
                type="button"
              >
                {submitOrderLoading && (
                  <StyledBuyLoader>
                    <SvgLoaderIcon />
                  </StyledBuyLoader>
                )}
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
