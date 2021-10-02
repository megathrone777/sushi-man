import React from "react";
import { set } from "local-storage";

import { TProduct, TProductModifier } from "~/components";
import { TAction, TActionTypes } from "./actions";
import { TState, TAdditional } from "./initialState";

const setStateToLocalStorate = (currentState: TState): TState => {
  set<TState>("state", currentState);

  return currentState;
};

const reducer: React.Reducer<TState, TAction> = (state, action) => {
  const { payload, type } = action;

  const actions = {
    [TActionTypes.UPDATE_STORE]: (): TState => {
      console.log("update");
      return payload;
    },

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

      return setStateToLocalStorate({
        ...state,
        cart: {
          ...state.cart,
          products,
          totalPersons: cart.totalPersons,
        },
      });
    },

    [TActionTypes.SET_PRODUCT_MODIFIERS]: (): TState => {
      const modifiers = [...state.cart.modifiers];
      const foundIndex = modifiers.findIndex(
        (modifier: TProductModifier) => modifier.id === payload.id
      );

      return setStateToLocalStorate({
        ...state,
        cart: {
          ...state.cart,
          modifiers: [...state.cart.modifiers, payload],
        },
      });
    },

    [TActionTypes.REMOVE_PRODUCT]: (): TState => {
      const cart = { ...state.cart };
      const products = [...state.cart.products].filter(
        (product: TProduct) => product.id !== payload.id
      );

      cart.totalPersons =
        cart.totalPersons - payload.quantity * payload.persons;

      return setStateToLocalStorate({
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

      return setStateToLocalStorate({
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

      return setStateToLocalStorate({
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

      return setStateToLocalStorate({
        ...state,
        cart: {
          ...state.cart,
          additionals,
        },
      });
    },

    [TActionTypes.SET_SCHEDULE]: (): TState =>
      setStateToLocalStorate({
        ...state,
        schedule: payload,
      }),

    [TActionTypes.SET_CUTLERY_PRICE]: (): TState =>
      setStateToLocalStorate({
        ...state,
        cart: {
          ...state.cart,
          cutleryPrice: payload,
        },
      }),

    [TActionTypes.SET_CUTLERY_AMOUNT]: (): TState =>
      setStateToLocalStorate({
        ...state,
        cart: {
          ...state.cart,
          cutleryAmount: payload,
        },
      }),

    [TActionTypes.SET_CUTLERY_TOTAL_PRICE]: (): TState =>
      setStateToLocalStorate({
        ...state,
        cart: {
          ...state.cart,
          cutleryTotalPrice: payload,
        },
      }),

    [TActionTypes.SET_PICKUP]: (): TState =>
      setStateToLocalStorate({
        ...state,
        cart: {
          ...state.cart,
          isPickupChecked: payload,
        },
      }),

    [TActionTypes.SET_TOTAL_ROLLS_DISCOUNT]: (): TState =>
      setStateToLocalStorate({
        ...state,
        cart: {
          ...state.cart,
          totalRollsDiscount: payload,
        },
      }),

    [TActionTypes.SET_DELIVERY_PRICE]: (): TState =>
      setStateToLocalStorate({
        ...state,
        cart: {
          ...state.cart,
          deliveryPrice: payload,
        },
      }),

    [TActionTypes.SET_LENGTH_IN_KM]: (): TState =>
      setStateToLocalStorate({
        ...state,
        cart: {
          ...state.cart,
          lengthInKm: payload,
        },
      }),

    [TActionTypes.SET_CUSTOMER_NAME]: (): TState =>
      setStateToLocalStorate({
        ...state,
        cart: {
          ...state.cart,
          customerName: payload,
        },
      }),

    [TActionTypes.SET_CUSTOMER_PHONE]: (): TState =>
      setStateToLocalStorate({
        ...state,
        cart: {
          ...state.cart,
          customerPhone: payload,
        },
      }),

    [TActionTypes.SET_CUSTOMER_ADDRESS]: (): TState =>
      setStateToLocalStorate({
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
