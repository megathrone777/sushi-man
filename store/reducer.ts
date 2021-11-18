import React from "react";
import { set as setToLocalStorage } from "local-storage";

import { TProduct } from "~/components";
import { TAction, TActionTypes } from "./actions";
import { TState, TAdditional, TCartProduct } from "./initialState";

const setStateToLocalStorage = (currentState: TState): TState => {
  setToLocalStorage<TState>("state", currentState);

  return currentState;
};

const reducer: React.Reducer<TState, TAction> = (state, action) => {
  const { payload, type } = action;

  const actions = {
    [TActionTypes.SET_SHOP_SETTINGS]: (): TState => ({
      ...state,
      shopSettings: payload,
    }),

    [TActionTypes.ADD_PRODUCT]: (): TState => {
      const cart = { ...state.cart };
      const products = [...state.cart.products];
      const foundIndex = products.findIndex(
        (product: TCartProduct): boolean => product.id === payload.id
      );

      if (products[foundIndex]) {
        if (payload.product_modifiers && !!payload.product_modifiers.length) {
          products.push(payload);
        } else {
          products[foundIndex].quantity = products[foundIndex].quantity + 1;
          products[foundIndex].totalPrice =
            products[foundIndex].totalPrice + parseInt(payload.price);
        }
      } else {
        products.push(payload);
      }

      return setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          products,
        },
      });
    },

    [TActionTypes.REMOVE_PRODUCT]: (): TState => {
      const products = [...state.cart.products].filter(
        (product: TCartProduct) => product.id !== payload.id
      );

      return setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          products,
        },
      });
    },

    [TActionTypes.CLEAR_CART]: (): TState => ({
      ...state,
      cart: {
        ...state.cart,
        products: [],
      },
    }),

    [TActionTypes.DECREASE_QUANTITY]: (): TState => {
      const products = [...state.cart.products];
      const foundIndex = products.findIndex(
        (product: TProduct) => product.id === payload.id
      );

      products[foundIndex].quantity = payload.quantity;
      products[foundIndex].totalPrice =
        (parseInt(products[foundIndex].price) +
          products[foundIndex].product_modifiers.length * 20) *
        payload.quantity;

      return setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          products,
        },
      });
    },

    [TActionTypes.INCREASE_QUANTITY]: (): TState => {
      const products = [...state.cart.products];
      const foundIndex = products.findIndex(
        (product: TProduct) => product.id === payload.id
      );

      products[foundIndex].quantity = payload.quantity;
      products[foundIndex].totalPrice =
        (parseInt(products[foundIndex].price) +
          products[foundIndex].product_modifiers.length * 20) *
        payload.quantity;

      return setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          products,
        },
      });
    },

    [TActionTypes.CHANGE_ADDITIONAL_QUANTITY]: (): TState => {
      const additionals = [...state.cart.additionals];
      const foundIndex = additionals.findIndex(
        (additional: TAdditional) => additional.id === payload.id
      );
      additionals[foundIndex].quantity = payload.quantity;

      return setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          additionals,
        },
      });
    },

    [TActionTypes.SET_ADDITIONALS]: (): TState => ({
      ...state,
      cart: {
        ...state.cart,
        additionals: payload,
      },
    }),

    [TActionTypes.ADD_ADDITIONAL]: (): TState => {
      const additionals = [...state.cart.additionals];
      const foundIndex = additionals.findIndex(
        (additional: TAdditional) => additional.id === payload.id
      );
      additionals[foundIndex].quantity = payload.quantity;

      return setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          additionals,
        },
      });
    },

    [TActionTypes.SET_SCHEDULE]: (): TState =>
      setStateToLocalStorage({
        ...state,
        schedule: payload,
      }),

    [TActionTypes.SET_CUTLERY_AMOUNT]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          cutleryAmount: payload,
        },
      }),

    [TActionTypes.SET_PICKUP]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          isPickupChecked: payload,
        },
      }),

    [TActionTypes.SET_TOTAL_ROLLS_DISCOUNT]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          totalRollsDiscount: payload,
        },
      }),

    [TActionTypes.SET_DELIVERY_PRICE]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          deliveryPrice: payload,
        },
      }),

    [TActionTypes.SET_AGREE]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          isAgreeChecked: payload,
        },
      }),

    [TActionTypes.SET_AGREE_ERROR]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          isAgreeCheckedError: payload,
        },
      }),

    [TActionTypes.SET_CUSTOMER_EMAIL]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          customerEmail: payload,
        },
      }),

    [TActionTypes.SET_CUSTOMER_EMAIL_ERROR]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          customerEmailError: payload,
        },
      }),

    [TActionTypes.SET_CUSTOMER_NAME]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          customerName: payload,
        },
      }),

    [TActionTypes.SET_CUSTOMER_PHONE]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          customerPhone: payload,
        },
      }),

    [TActionTypes.SET_CUSTOMER_ADDRESS]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          customerAddress: payload,
        },
      }),

    [TActionTypes.SET_CUSTOMER_ADDRESS_ERROR]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          customerAddressError: payload,
        },
      }),

    [TActionTypes.SET_CUSTOMER_NAME_ERROR]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          customerNameError: payload,
        },
      }),

    [TActionTypes.SET_CUSTOMER_PHONE_ERROR]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          customerPhoneError: payload,
        },
      }),

    DEFAULT: (): TState => {
      return state;
    },
  };

  return (actions[type] || actions["DEFAULT"])();
};

export { reducer };
