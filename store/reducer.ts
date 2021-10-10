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

        cart.totalPersons = cart.totalPersons + products[foundIndex].persons;
      } else {
        products.push(payload);
        cart.totalPersons = cart.totalPersons + payload.persons;
      }

      return setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          products,
          totalPersons: cart.totalPersons,
        },
      });
    },

    [TActionTypes.REMOVE_PRODUCT]: (): TState => {
      const cart = { ...state.cart };
      const products = [...state.cart.products].filter(
        (product: TCartProduct) => product.id !== payload.id
      );

      cart.totalPersons =
        cart.totalPersons - payload.quantity * payload.persons;

      return setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          products,
          totalPersons: cart.totalPersons,
        },
      });
    },

    [TActionTypes.CLEAR_CART]: (): TState => ({
      ...state,
      cart: {
        ...state.cart,
        products: [],
        totalPersons: 0,
      },
    }),

    [TActionTypes.DECREASE_QUANTITY]: (): TState => {
      const cart = { ...state.cart };
      const products = [...state.cart.products];
      const foundIndex = products.findIndex(
        (product: TProduct) => product.id === payload.id
      );

      products[foundIndex].quantity = payload.quantity;
      products[foundIndex].totalPrice =
        (parseInt(products[foundIndex].price) +
          products[foundIndex].product_modifiers.length * 20) *
        payload.quantity;
      cart.totalPersons = cart.totalPersons - payload.persons;

      return setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          products,
          totalPersons: cart.totalPersons,
        },
      });
    },

    [TActionTypes.INCREASE_QUANTITY]: (): TState => {
      const cart = { ...state.cart };
      const products = [...state.cart.products];
      const foundIndex = products.findIndex(
        (product: TProduct) => product.id === payload.id
      );

      products[foundIndex].quantity = payload.quantity;
      products[foundIndex].totalPrice =
        (parseInt(products[foundIndex].price) +
          products[foundIndex].product_modifiers.length * 20) *
        payload.quantity;
      cart.totalPersons = cart.totalPersons + payload.persons;

      return setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          products,
          totalPersons: cart.totalPersons,
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

    [TActionTypes.SET_CUTLERY_PRICE]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          cutleryPrice: payload,
        },
      }),

    [TActionTypes.SET_CUTLERY_AMOUNT]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          cutleryAmount: payload,
        },
      }),

    [TActionTypes.SET_CUTLERY_TOTAL_PRICE]: (): TState =>
      setStateToLocalStorage({
        ...state,
        cart: {
          ...state.cart,
          cutleryTotalPrice: payload,
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

    DEFAULT: (): TState => {
      return state;
    },
  };

  return (actions[type] || actions["DEFAULT"])();
};

export { reducer };
