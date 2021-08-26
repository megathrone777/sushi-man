import React from "react";

import { TAction, TActionTypes } from "./actions";
import { TAdditional, TProduct, TState } from "./initialState";

const reducer: React.Reducer<TState, TAction> = (state, action) => {
  const { payload, type } = action;

  const actions = {
    [TActionTypes.ADD_PRODUCT]: (): TState => ({
      ...state,
      cart: {
        ...state.cart,
        products: [...state.cart.products, payload],
      },
    }),
    [TActionTypes.CLEAR_CART]: (): TState => ({
      ...state,
      cart: {
        ...state.cart,
        products: [],
      },
    }),
    [TActionTypes.CHANGE_QUANTITY]: (): TState => {
      const products = [...state.cart.products];

      const foundIndex = products.findIndex(
        (product: TProduct) => product.id === payload.id
      );

      products[foundIndex].quantity = payload.quantity;
      products[foundIndex].totalPrice =
        parseInt(products[foundIndex].price) * payload.quantity;

      return {
        ...state,
        cart: {
          ...state.cart,
          products,
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
    DEFAULT: (): TState => {
      return state;
    },
  };

  return (actions[type] || actions["DEFAULT"])();
};

export { reducer };
