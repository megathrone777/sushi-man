import { TAdditional, TCartProduct, TSchedule } from "./initialState";

export enum TActionTypes {
  ADD_PRODUCT = "ADD_PRODUCT",
  REMOVE_PRODUCT = "REMOVE_PRODUCT",
  CLEAR_CART = "CLEAR_CART",
  CHANGE_QUANTITY = "CHANGE_QUANTITY",
  CHANGE_ADDITIONAL_QUANTITY = "CHANGE_ADDITIONAL_QUANTITY",
  SET_ADDITIONALS = "SET_ADDITIONALS",
  ADD_ADDITIONAL = "ADD_ADDITIONAL",
  SET_CUTLERY_AMOUNT = "SET_CUTLERY_AMOUNT",
  SET_CUTLERY_PRICE = "SET_CUTLERY_PRICE",
  SET_CUTLERY_TOTAL_PRICE = "SET_CUTLERY_TOTAL_PRICE",
  SET_PICKUP = "SET_PICKUP",
  SET_SCHEDULE = "SET_SCHEDULE",
  SET_PRODUCTS = "SET_PRODUCTS",
}

export interface TAction {
  payload: any;
  type: TActionTypes;
}

export const addToCart = (product: TCartProduct): TAction => ({
  payload: product,
  type: TActionTypes.ADD_PRODUCT,
});

export const removeFromCart = (
  id: number,
  persons: number,
  quantity: number
): TAction => ({
  payload: {
    id,
    persons,
    quantity,
  },
  type: TActionTypes.REMOVE_PRODUCT,
});

export const clearCart = (): TAction => ({
  payload: null,
  type: TActionTypes.CLEAR_CART,
});

export const changeQuantity = (
  id: number,
  quantity: number,
  persons: number
): TAction => ({
  payload: {
    id,
    persons,
    quantity,
  },
  type: TActionTypes.CHANGE_QUANTITY,
});

export const changeAdditionalQuantity = (
  id: number,
  quantity: number
): TAction => ({
  payload: {
    id,
    quantity,
  },
  type: TActionTypes.CHANGE_ADDITIONAL_QUANTITY,
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

export const setCutleryPrice = (price: number): TAction => ({
  payload: price,
  type: TActionTypes.SET_CUTLERY_PRICE,
});

export const setCutleryAmount = (amount: number): TAction => ({
  payload: amount,
  type: TActionTypes.SET_CUTLERY_AMOUNT,
});

export const setCutleryTotalPrice = (price: number): TAction => ({
  payload: price,
  type: TActionTypes.SET_CUTLERY_TOTAL_PRICE,
});

export const setPickup = (checked: boolean): TAction => ({
  payload: checked,
  type: TActionTypes.SET_PICKUP,
});

export const setSchedule = ({
  schedule_cs,
  schedule_ru,
}: Record<string, TSchedule>) => ({
  payload: {
    schedule_cs,
    schedule_ru,
  },
  type: TActionTypes.SET_SCHEDULE,
});
