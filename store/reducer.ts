import React from "react";

import { TProduct } from "~/components";
import { TAction, TActionTypes } from "./actions";
import { TAdditional, TState } from "./initialState";

const reducer: React.Reducer<TState, TAction> = (state, action) => {
  const { payload, type } = action;

  const actions = {
    [TActionTypes.ADD_PRODUCT]: (): TState => {
      const cart = { ...state.cart };
      const products = [...state.cart.products];
      const foundIndex = products.findIndex(
        (product: TProduct) => product.id === payload.id
      );

      if (products[foundIndex]) {
        products[foundIndex].quantity = products[foundIndex].quantity + 1;
        products[foundIndex].totalPrice =
          products[foundIndex].totalPrice + parseInt(payload.price);
        cart.totalPersons = cart.totalPersons + products[foundIndex].persons;
      } else {
        products.push(payload);
        cart.totalPersons = cart.totalPersons + payload.persons;
      }

      return {
        ...state,
        cart: {
          ...state.cart,
          products,
          totalPersons: cart.totalPersons,
        },
      };
    },

    [TActionTypes.REMOVE_PRODUCT]: (): TState => {
      const cart = { ...state.cart };
      const products = [...state.cart.products].filter(
        (product: TProduct) => product.id !== payload.id
      );

      cart.totalPersons =
        cart.totalPersons - payload.quantity * payload.persons;

      return {
        ...state,
        cart: {
          ...state.cart,
          products,
          totalPersons: cart.totalPersons,
        },
      };
    },

    [TActionTypes.CLEAR_CART]: (): TState => ({
      ...state,
      cart: {
        ...state.cart,
        products: [],
        totalPersons: 0,
      },
    }),

    [TActionTypes.CHANGE_QUANTITY]: (): TState => {
      const cart = { ...state.cart };
      const products = [...state.cart.products];
      const foundIndex = products.findIndex(
        (product: TProduct) => product.id === payload.id
      );

      products[foundIndex].quantity = payload.quantity;
      products[foundIndex].totalPrice =
        parseInt(products[foundIndex].price) * payload.quantity;
      cart.totalPersons = cart.totalPersons + payload.persons;

      return {
        ...state,
        cart: {
          ...state.cart,
          products,
          totalPersons: cart.totalPersons,
        },
      };
    },

    [TActionTypes.CHANGE_ADDITIONAL_QUANTITY]: (): TState => {
      const additionals = [...state.cart.additionals];
      const foundIndex = additionals.findIndex(
        (additional: TAdditional) => additional.id === payload.id
      );
      additionals[foundIndex].quantity = payload.quantity;

      return {
        ...state,
        cart: {
          ...state.cart,
          additionals,
        },
      };
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

      return {
        ...state,
        cart: {
          ...state.cart,
          additionals,
        },
      };
    },

    [TActionTypes.SET_SCHEDULE]: (): TState => ({
      ...state,
      schedule: payload,
    }),

    [TActionTypes.SET_CUTLERY_PRICE]: (): TState => ({
      ...state,
      cutleryPrice: payload,
    }),

    [TActionTypes.SET_CUTLERY_AMOUNT]: (): TState => ({
      ...state,
      cart: {
        ...state.cart,
        cutleryAmount: payload,
      },
    }),

    [TActionTypes.SET_CUTLERY_TOTAL_PRICE]: (): TState => ({
      ...state,
      cart: {
        ...state.cart,
        cutleryTotalPrice: payload,
      },
    }),

    [TActionTypes.SET_PICKUP]: (): TState => ({
      ...state,
      cart: {
        ...state.cart,
        isPickupChecked: payload,
      },
    }),

    DEFAULT: (): TState => {
      return state;
    },
  };

  return (actions[type] || actions["DEFAULT"])();
};

export { reducer };
