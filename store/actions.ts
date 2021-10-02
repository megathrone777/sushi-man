import { TProductModifier } from "~/components";
import { TAdditional, TCartProduct, TSchedule } from "./initialState";

export enum TActionTypes {
  UPDATE_STORE = "UPATE_STORE",
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
  SET_TOTAL_ROLLS_DISCOUNT = "SET_TOTAL_ROLLS_DISCOUNT",
  SET_LENGTH_IN_KM = "SET_LENGTH_IN_KM",
  SET_DELIVERY_PRICE = "SET_DELIVERY_PRICE",
  SET_CUSTOMER_NAME = "SET_CUSTOMER_NAME",
  SET_CUSTOMER_NAME_ERROR = "SET_CUSTOMER_NAME_ERROR",
  SET_CUSTOMER_PHONE = "SET_CUSTOMER_PHONE",
  SET_CUSTOMER_PHONE_ERROR = "SET_CUSTOMER_PHONE_ERROR",
  SET_CUSTOMER_ADDRESS = "SET_CUSTOMER_ADDRESS",
  SET_CUSTOMER_ADDRESS_ERROR = "SET_CUSTOMER_ADDRESS_ERROR",
  SET_CUSTOMER_NOTE = "SET_CUSTOMER_NOTE",
  SET_PRODUCT_MODIFIERS = "SET_PRODUCT_MODIFIERS",
}

export interface TAction {
  payload: any;
  type: TActionTypes;
}

// export const updateStore = (store: TState): TAction => ({
//   payload: store,
//   type: TActionTypes.UPDATE_STORE,
// });

export const addToCart = (product: TCartProduct): TAction => ({
  payload: product,
  type: TActionTypes.ADD_PRODUCT,
});

export const setProductModifiers = (modifier: TProductModifier): TAction => ({
  payload: modifier,
  type: TActionTypes.SET_PRODUCT_MODIFIERS,
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

export const setDeliveryPrice = (price: number): TAction => ({
  payload: price,
  type: TActionTypes.SET_DELIVERY_PRICE,
});

export const setTotalRollsDiscount = (price: number): TAction => ({
  payload: price,
  type: TActionTypes.SET_TOTAL_ROLLS_DISCOUNT,
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

export const setLengthInKm = (lengthInKm: string): TAction => ({
  payload: lengthInKm,
  type: TActionTypes.SET_LENGTH_IN_KM,
});

export const setCustomerName = (name: string): TAction => ({
  payload: name,
  type: TActionTypes.SET_CUSTOMER_NAME,
});

export const setCustomerAddress = (address: string): TAction => ({
  payload: address,
  type: TActionTypes.SET_CUSTOMER_ADDRESS,
});

export const setCustomerPhone = (phone: string): TAction => ({
  payload: phone,
  type: TActionTypes.SET_CUSTOMER_PHONE,
});

export const setCustomerNote = (note: string): TAction => ({
  payload: note,
  type: TActionTypes.SET_CUSTOMER_NOTE,
});
