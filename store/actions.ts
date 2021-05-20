import { TAdditional, TCartProduct } from "./initialState";

export enum TActionTypes {
  ADD_PRODUCT = "ADD_PRODUCT",
  CLEAR_CART = "CLEAR_CART",
  CHANGE_QUANTITY = "CHANGE_QUANTITY",
  SET_ADDITIONALS = "SET_ADDITIONALS",
  ADD_ADDITIONAL = "ADD_ADDITIONAL",
  ADD_CUTLERY = "ADD_CUTLERY",
}

export interface TAction {
  payload: any;
  type: TActionTypes;
}

export const addToCart = (product: TCartProduct): TAction => ({
  payload: product,
  type: TActionTypes.ADD_PRODUCT,
});

export const clearCart = (): TAction => ({
  payload: null,
  type: TActionTypes.CLEAR_CART,
});

export const changeQuantity = (id: number, quantity: number): TAction => ({
  payload: {
    id,
    quantity,
  },
  type: TActionTypes.CHANGE_QUANTITY,
});

export const setAdditionals = (additionals: TAdditional[]): TAction => ({
  payload: additionals,
  type: TActionTypes.SET_ADDITIONALS,
});

export const addAdditional = (id: number, quantity: number): TAction => ({
  payload: {
    id,
    quantity,
  },
  type: TActionTypes.ADD_ADDITIONAL,
});

export const addCutlery = (amount: number) => ({
  payload: amount,
  type: TActionTypes.ADD_CUTLERY,
});
